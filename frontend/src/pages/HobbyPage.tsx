import {
  useEffect,
  useState,
} from "react";

import HobbyCard from "../components/hobby/HobbyCard";

import {
  getHobbies,
  pinHobby,
  unpinHobby,
  type Hobby,
} from "../api/hobby";

function HobbyPage() {
  /*
   * DB에서 가져온 취미 목록
   */
  const [hobbies, setHobbies] =
    useState<Hobby[]>([]);

  /*
   * 첫 데이터 조회 로딩
   */
  const [loading, setLoading] =
    useState(true);

  /*
   * 선택/해제 요청 중인 취미 ID
   *
   * 같은 버튼을 연속으로 여러 번 누르는 것을
   * 방지하는 데 사용할 수 있다.
   */
  const [updatingHobbyId, setUpdatingHobbyId] =
    useState<number | null>(null);

  /*
   * API 오류 메시지
   */
  const [error, setError] =
    useState("");

  /*
   * 페이지 첫 진입 시
   *
   * GET /hobbies
   *
   * 서버에서 실제 취미 목록과
   * 현재 사용자의 isPinned 상태를 가져온다.
   */
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        setLoading(true);

        setError("");

        const data =
          await getHobbies();

        setHobbies(data);
      } catch (error) {
        console.error(
          "Hobby API 오류:",
          error,
        );

        setError(
          "취미 목록을 불러오지 못했습니다.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHobbies();
  }, []);

  /*
   * 취미 선택 / 선택 해제
   */
  const handleTogglePin = async (
    hobby: Hobby,
  ) => {
    /*
     * 이미 같은 취미 요청이 진행 중이면
     * 중복 요청을 막는다.
     */
    if (
      updatingHobbyId === hobby.id
    ) {
      return;
    }

    try {
      setUpdatingHobbyId(hobby.id);

      setError("");

      /*
       * 현재 선택된 취미라면 DELETE
       *
       * 선택되지 않았다면 POST
       */
      if (hobby.isPinned) {
        await unpinHobby(hobby.id);
      } else {
        await pinHobby(hobby.id);
      }

      /*
       * 서버 요청 성공 후
       * 화면 상태도 변경한다.
       *
       * 전체 목록을 다시 요청하지 않아도
       * UI를 즉시 변경할 수 있다.
       */
      setHobbies(
        (currentHobbies) =>
          currentHobbies.map(
            (currentHobby) =>
              currentHobby.id ===
              hobby.id
                ? {
                    ...currentHobby,

                    isPinned:
                      !currentHobby.isPinned,
                  }
                : currentHobby,
          ),
      );
    } catch (error) {
      console.error(
        "취미 선택 변경 오류:",
        error,
      );

      setError(
        "취미 선택 상태를 변경하지 못했습니다.",
      );
    } finally {
      setUpdatingHobbyId(null);
    }
  };

  /*
   * 선택된 취미 개수 계산
   */
  const pinnedCount =
    hobbies.filter(
      (hobby) => hobby.isPinned,
    ).length;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-gray-500">
          취미 목록을 불러오는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 페이지 소개 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800">
          취미 둘러보기
        </h1>

        <p className="mt-2 text-gray-500">
          좋아하는 취미를 선택하고
          광기의 취미열차에서 기록해보세요.
        </p>
      </section>

      {/* API 오류 */}
      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* 실제 선택 취미 개수 */}
      <section className="mt-8 rounded-2xl bg-orange-100 p-5">
        <p className="text-sm font-medium text-orange-600">
          내가 선택한 취미
        </p>

        <p className="mt-1 text-2xl font-bold text-gray-800">
          {pinnedCount}개
        </p>
      </section>

      {/* 실제 DB 취미 목록 */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          전체 취미
        </h2>

        {hobbies.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center text-gray-500 shadow-sm">
            등록된 취미가 없습니다.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hobbies.map(
              (hobby) => (
                <HobbyCard
                  key={hobby.id}
                  name={hobby.name}
                  description={
                    hobby.description
                  }
                  isPinned={
                    hobby.isPinned
                  }
                  onTogglePin={() =>
                    handleTogglePin(
                      hobby,
                    )
                  }
                />
              ),
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default HobbyPage;