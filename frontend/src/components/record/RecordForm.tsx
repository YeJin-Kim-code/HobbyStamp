import { useState } from "react";

type RecordFormProps = {
  onAddRecord: (record: {
    hobby: string;
    title: string;
    content: string;
    duration: number;
  }) => void;
};

function RecordForm({ onAddRecord }: RecordFormProps) {
  const [hobby, setHobby] = useState("독서");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim() || !content.trim() || !duration) {
      return;
    }

    onAddRecord({
      hobby,
      title,
      content,
      duration: Number(duration),
    });

    setTitle("");
    setContent("");
    setDuration("");
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
        <div>
          <label
            htmlFor="hobby"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            취미
          </label>

          <select
            id="hobby"
            value={hobby}
            onChange={(event) =>
              setHobby(event.target.value)
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          >
            <option value="📚 독서">📚 독서</option>
            <option value="🏃 러닝">🏃 러닝</option>
            <option value="🎨 그림">🎨 그림</option>
            <option value="🍳 요리">🍳 요리</option>
          </select>
        </div>

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

        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            활동 시간
          </label>

          <input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(event) =>
              setDuration(event.target.value)
            }
            placeholder="예: 30"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          />

          <p className="mt-1 text-xs text-gray-400">
            분 단위로 입력해주세요.
          </p>
        </div>

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
              setContent(event.target.value)
            }
            placeholder="오늘의 취미 활동을 기록해보세요."
            rows={5}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          기록 추가
        </button>
      </div>
    </form>
  );
}

export default RecordForm;