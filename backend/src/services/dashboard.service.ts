import { AppDataSource } from "../config/data-source";
import { HobbyRecord } from "../entities/hobby-record.entity";
import { Stamp } from "../entities/stamp.entity";
import { UserHobby } from "../entities/user-hobby.entity";

const hobbyRecordRepository = AppDataSource.getRepository(HobbyRecord);

const stampRepository = AppDataSource.getRepository(Stamp);

const userHobbyRepository = AppDataSource.getRepository(UserHobby);

export const getDashboard = async (userId: number) => {
  /*
   * Promise.all을 사용해 서로 의존하지 않는 DB 조회를
   * 동시에 실행한다.
   *
   * 1. 전체 취미 기록 개수
   * 2. 획득 스탬프 개수
   * 3. 선택한 취미 개수
   * 4. 최근 취미 기록 3개
   * 5. 최근 스탬프 3개
   */
  const [recordCount, stampCount, hobbyCount, recentRecords, recentStamps] =
    await Promise.all([
      hobbyRecordRepository.count({
        where: {
          user: {
            id: userId,
          },
        },
      }),

      stampRepository.count({
        where: {
          user: {
            id: userId,
          },
        },
      }),

      userHobbyRepository.count({
        where: {
          user: {
            id: userId,
          },
          isPinned: true,
        },
      }),

      hobbyRecordRepository.find({
        where: {
          user: {
            id: userId,
          },
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
          user: {
            id: userId,
          },
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
      hobbyCount,
      recordCount,
      stampCount,
    },

    recentRecords,

    recentStamps,
  };
};
