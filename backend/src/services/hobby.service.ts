import { AppDataSource } from "../config/data-source";

import { Hobby } from "../entities/hobby.entity";
import { User } from "../entities/user.entity";
import { UserHobby } from "../entities/user-hobby.entity";

export class HobbyService {
  private hobbyRepository = AppDataSource.getRepository(Hobby);

  private userRepository = AppDataSource.getRepository(User);

  private userHobbyRepository = AppDataSource.getRepository(UserHobby);

  /*
   * 전체 취미 목록 + 현재 사용자의 선택 여부 조회
   */
  async getHobbies(userId: number) {
    /*
     * 전체 취미와 사용자 취미를 동시에 조회한다.
     */
    const [hobbies, userHobbies] = await Promise.all([
      this.hobbyRepository.find({
        order: {
          id: "ASC",
        },
      }),

      this.userHobbyRepository.find({
        where: {
          user: {
            id: userId,
          },
          isPinned: true,
        },

        relations: {
          hobby: true,
        },
      }),
    ]);

    /*
     * 사용자가 선택한 hobby ID를 Set으로 만든다.
     *
     * Set을 사용하면 특정 ID가 존재하는지 빠르게 확인할 수 있다.
     */
    const pinnedHobbyIds = new Set(
      userHobbies.map((userHobby) => Number(userHobby.hobby.id)),
    );

    /*
     * 전체 Hobby 데이터에 isPinned 값을 추가해서
     * 프론트로 반환한다.
     */
    return hobbies.map((hobby) => ({
      id: hobby.id,
      name: hobby.name,
      description: hobby.description,

      isPinned: pinnedHobbyIds.has(Number(hobby.id)),
    }));
  }

  /*
   * 취미 선택
   */
  async pinHobby(userId: number, hobbyId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    const hobby = await this.hobbyRepository.findOne({
      where: {
        id: hobbyId,
      },
    });

    if (!hobby) {
      throw new Error("취미를 찾을 수 없습니다.");
    }

    /*
     * 과거에 선택했다가 해제한 취미인지 확인한다.
     */
    const existingUserHobby = await this.userHobbyRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        hobby: {
          id: hobbyId,
        },
      },

      relations: {
        user: true,
        hobby: true,
      },
    });

    /*
     * 이미 UserHobby가 있다면 새 row를 만들지 않고
     * 다시 활성화한다.
     */
    if (existingUserHobby) {
      existingUserHobby.isPinned = true;

      return await this.userHobbyRepository.save(existingUserHobby);
    }

    /*
     * 처음 선택하는 취미라면 새로운 UserHobby 생성
     */
    const userHobby = this.userHobbyRepository.create({
      user,
      hobby,
      isPinned: true,
    });

    return await this.userHobbyRepository.save(userHobby);
  }

  /*
   * 취미 선택 해제
   */
  async unpinHobby(userId: number, hobbyId: number) {
    const userHobby = await this.userHobbyRepository.findOne({
      where: {
        user: {
          id: userId,
        },

        hobby: {
          id: hobbyId,
        },
      },

      relations: {
        user: true,
        hobby: true,
      },
    });

    if (!userHobby) {
      throw new Error("관심 취미로 등록되어 있지 않습니다.");
    }

    /*
     * DB row 자체를 삭제하지 않고 상태만 false로 변경한다.
     */
    userHobby.isPinned = false;

    return await this.userHobbyRepository.save(userHobby);
  }
}
