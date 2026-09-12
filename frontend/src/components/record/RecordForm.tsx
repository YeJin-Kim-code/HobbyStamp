import { useState } from "react";

import type { Hobby } from "../../api/hobby";

type RecordFormData = {
  hobbyId: number;
  title: string;
  content: string;
  activityDate: string;
  goalAchieved: boolean;
};

type RecordFormProps = {
  hobbies: Hobby[];

  onAddRecord: (
    record: RecordFormData,
  ) => Promise<void>;
};

function RecordForm({
  hobbies,
  onAddRecord,
}: RecordFormProps) {
  const [hobbyId, setHobbyId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [activityDate, setActivityDate] =
    useState(
      new Date().toISOString().split("T")[0],
    );

  const [goalAchieved, setGoalAchieved] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    /*
     * 필수 입력값 검사
     */
    if (
      !hobbyId ||
      !title.trim() ||
      !content.trim() ||
      !activityDate
    ) {
      alert("모든 필수 항목을 입력해주세요.");

      return;
    }

    try {
      setIsSubmitting(true);

      /*
       * RecordPage에게 실제 기록 생성을 요청한다.
       */
      await onAddRecord({
        hobbyId: Number(hobbyId),
        title,
        content,
        activityDate,
        goalAchieved,
      });

      /*
       * API 요청이 성공했을 때만
       * 입력 폼을 초기화한다.
       */
      setTitle("");
      setContent("");
      setGoalAchieved(false);

      setActivityDate(
        new Date()
          .toISOString()
          .split("T")[0],
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-bold text-gray-900">
        오늘의 취미 기록
      </h2>

      <div className="space-y-5">
        {/* 취미 선택 */}
        <div>
          <label
            htmlFor="hobby"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            취미
          </label>

          <select
            id="hobby"
            value={hobbyId}
            onChange={(event) =>
              setHobbyId(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          >
            <option value="">
              취미를 선택해주세요.
            </option>

            {hobbies.map((hobby) => (
              <option
                key={hobby.id}
                value={hobby.id}
              >
                {hobby.name}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            제목
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="오늘 무엇을 했나요?"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          />
        </div>

        {/* 활동 날짜 */}
        <div>
          <label
            htmlFor="activityDate"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            활동 날짜
          </label>

          <input
            id="activityDate"
            type="date"
            value={activityDate}
            onChange={(event) =>
              setActivityDate(
                event.target.value,
              )
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          />
        </div>

        {/* 기록 내용 */}
        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            기록
          </label>

          <textarea
            id="content"
            value={content}
            onChange={(event) =>
              setContent(
                event.target.value,
              )
            }
            placeholder="오늘의 취미 활동을 기록해보세요."
            rows={5}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          />
        </div>

        {/* 목표 달성 여부 */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-orange-50 p-4">
          <input
            type="checkbox"
            checked={goalAchieved}
            onChange={(event) =>
              setGoalAchieved(
                event.target.checked,
              )
            }
            className="h-4 w-4 accent-orange-500"
          />

          <span className="text-sm font-semibold text-gray-700">
            오늘의 취미 목표를 달성했어요 🎯
          </span>
        </label>

        {/* 등록 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          {isSubmitting
            ? "기록 저장 중..."
            : "기록 추가"}
        </button>
      </div>
    </form>
  );
}

export default RecordForm;