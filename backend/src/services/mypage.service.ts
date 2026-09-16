import { AppDataSource } from "../config/data-source";

import { User } from "../entities/user.entity";
import { HobbyRecord } from "../entities/hobby-record.entity";
import { Stamp } from "../entities/stamp.entity";
import { Post } from "../entities/post.entity";
import { Comment } from "../entities/comment.entity";

const userRepository = AppDataSource.getRepository(User);

const hobbyRecordRepository = AppDataSource.getRepository(HobbyRecord);

const stampRepository = AppDataSource.getRepository(Stamp);

const postRepository = AppDataSource.getRepository(Post);

const commentRepository = AppDataSource.getRepository(Comment);

export const getMyPage = async (userId: number) => {
  // ========================================
  // 사용자 기본 정보
  // ========================================

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },

    select: {
      id: true,
      email: true,
      nickname: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // ========================================
  // 취미 기록 조회
  //
  // hobbyCount 계산을 위해
  // hobby relation도 같이 가져온다.
  // ========================================

  const records = await hobbyRecordRepository.find({
    where: {
      user: {
        id: userId,
      },
    },

    relations: {
      hobby: true,
    },
  });

  // ========================================
  // 중복을 제외한 취미 개수
  // ========================================

  const hobbyIds = new Set(records.map((record) => record.hobby.id));

  const hobbyCount = hobbyIds.size;

  // 이미 records를 조회했기 때문에
  // 다시 DB COUNT 요청을 하지 않는다.
  const recordCount = records.length;

  // ========================================
  // 나머지 통계 병렬 조회
  // ========================================

  const [stampCount, postCount, commentCount] = await Promise.all([
    stampRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    }),

    postRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    }),

    commentRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    }),
  ]);

  // ========================================
  // 마이페이지 응답
  // ========================================

  return {
    user,

    stats: {
      hobbyCount,
      recordCount,
      stampCount,
      postCount,
      commentCount,
    },
  };
};
