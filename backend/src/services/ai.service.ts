import Groq from "groq-sdk";

import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/post.entity";
import { HobbyRecord } from "../entities/hobby-record.entity";
const postRepository = AppDataSource.getRepository(Post);
const hobbyRecordRepository = AppDataSource.getRepository(HobbyRecord);
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const summarizePost = async (postId:number) => {
    const post = await postRepository.findOne({
        where: {id:postId},
    });
    if(!post) {
        throw new Error("POST_NOT_FOUND");
    }
    const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content:
          "너는 취미 기록 서비스의 게시글을 요약하는 AI야. 게시글의 핵심 내용을 한국어로 간결하게 3줄 이내로 요약해줘.",
      },
      {
        role: "user",
        content: `제목: ${post.title}\n내용: ${post.content}`,
      },
    ],

    temperature: 0.3,
    });

      const summary = completion.choices[0]?.message?.content;

  if (!summary) {
    throw new Error("AI_SUMMARY_FAILED");
  }

  post.aiSummary = summary;

  await postRepository.save(post);

  return summary;
}

export const analyzeHobbyType = async (userId: number) => {
  const records = await hobbyRecordRepository.find({
    where: {
      user: { id: userId },
    },
    relations: {
      hobby: true,
    },
    order: {
      createdAt: "DESC",
    },
  });

  if (records.length === 0) {
    throw new Error("HOBBY_RECORD_NOT_FOUND");
  }

  const recordText = records
    .map((record, index) => {
      return `
기록 ${index + 1}
취미: ${record.hobby.name}
제목: ${record.title}
내용: ${record.content}
목표 달성 여부: ${record.goalAchieved ? "달성" : "미달성"}
`;
    })
    .join("\n");

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "system",
        content: `
너는 취미 기록 서비스 HobbyStamp의 취미 성향 분석 AI야.

사용자의 여러 취미 기록을 종합하여 아래 5가지 유형 중
가장 가까운 하나를 선택해야 해.

[유형 기준]

1. Deep Digger
특정 취미를 반복적으로 깊게 파고드는 유형.
연습, 숙련, 전문성 향상, 탐구 등의 특징이 강함.

2. Explorer
다양한 종류의 취미와 새로운 경험을 즐기는 유형.
새로운 활동, 새로운 분야, 호기심 등의 특징이 강함.

3. Connector
취미를 통해 다른 사람과 관계를 맺고 소통하는 유형.
친구, 모임, 동호회, 함께하기, 공유 등의 특징이 강함.

4. Achiever
목표 설정과 달성, 기록 향상과 성취를 중요하게 생각하는 유형.
목표, 기록 갱신, 완료, 성공, 성장 등의 특징이 강함.

5. Healing
취미를 휴식과 감정 회복을 위해 즐기는 유형.
편안함, 스트레스 해소, 기분 전환, 안정 등의 특징이 강함.

여러 기록을 전체적으로 종합해서 판단해야 하며,
한 개의 기록에만 지나치게 영향을 받아서는 안 돼.

반드시 아래 형식으로만 답변해.

TYPE: 유형명
DESCRIPTION: 분석 이유를 한국어 2~3문장으로 설명
`,
      },
      {
        role: "user",
        content: `
다음은 사용자의 취미 기록이야.

${recordText}

이 사용자의 대표 취미 유형을 분석해줘.
`,
      },
    ],

    temperature: 0.2,
  });

  const result = completion.choices[0]?.message?.content;

  if (!result) {
    throw new Error("AI_ANALYSIS_FAILED");
  }

  return result;
};