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

  const [recordCount, stampCount, postCount, commentCount] = await Promise.all([
    hobbyRecordRepository.count({
      where: {
        user: { id: userId },
      },
    }),

    stampRepository.count({
      where: {
        user: { id: userId },
      },
    }),

    postRepository.count({
      where: {
        user: { id: userId },
      },
    }),

    commentRepository.count({
      where: {
        user: { id: userId },
      },
    }),
  ]);

  return {
    user,
    stats: {
      recordCount,
      stampCount,
      postCount,
      commentCount,
    },
  };
};
