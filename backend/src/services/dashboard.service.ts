import { AppDataSource } from "../config/data-source";
import { HobbyRecord } from "../entities/hobby-record.entity";
import { Stamp } from "../entities/stamp.entity";
import { Post } from "../entities/post.entity";

const hobbyRecordRepository = AppDataSource.getRepository(HobbyRecord);
const stampRepository = AppDataSource.getRepository(Stamp);
const postRepository = AppDataSource.getRepository(Post);

export const getDashboard = async (userId: number) => {
  const [recordCount, stampCount, postCount, recentRecords, recentStamps] =
    await Promise.all([
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

      hobbyRecordRepository.find({
        where: {
          user: { id: userId },
        },
        relations: {
          hobby: true,
        },
        order: {
          createdAt: "DESC",
        },
        take: 3,
      }),

      stampRepository.find({
        where: {
          user: { id: userId },
        },
        relations: {
          hobby: true,
          record: true,
        },
        order: {
          createdAt: "DESC",
        },
        take: 3,
      }),
    ]);

  return {
    stats: {
      recordCount,
      stampCount,
      postCount,
    },
    recentRecords,
    recentStamps,
  };
};
