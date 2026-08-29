import Groq from "groq-sdk";

import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/post.entity";

const postRepository = AppDataSource.getRepository(Post);

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