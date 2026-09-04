import { useState } from "react";

import RecordCard from "../components/record/RecordCard";
import RecordForm from "../components/record/RecordForm";

type Record = {
  id: number;
  hobby: string;
  title: string;
  content: string;
  duration: number;
  date: string;
};

const initialRecords: Record[] = [
  {
    id: 1,
    hobby: "📚 독서",
    title: "클린 코드 읽기",
    content:
      "함수는 하나의 역할만 가져야 한다는 내용을 공부했다.",
    duration: 40,
    date: "2026.09.04",
  },
  {
    id: 2,
    hobby: "🏃 러닝",
    title: "저녁 러닝",
    content:
      "천천히 페이스를 유지하면서 3km를 달렸다.",
    duration: 35,
    date: "2026.09.03",
  },
  {
    id: 3,
    hobby: "🎨 그림",
    title: "캐릭터 스케치",
    content:
      "간단한 캐릭터 얼굴과 표정을 연습했다.",
    duration: 50,
    date: "2026.09.02",
  },
];

function RecordPage() {
  const [records, setRecords] =
    useState<Record[]>(initialRecords);

  const handleAddRecord = (newRecord: {
    hobby: string;
    title: string;
    content: string;
    duration: number;
  }) => {
    const record: Record = {
      id: Date.now(),
      ...newRecord,
      date: new Date().toLocaleDateString("ko-KR"),
    };

    setRecords((prevRecords) => [
      record,
      ...prevRecords,
    ]);
  };

  return (
    <main className="min-h-screen bg-orange-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8">
          <p className="mb-2 text-sm font-bold text-orange-500">
            MY RECORD
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            취미 기록
          </h1>

          <p className="mt-2 text-gray-500">
            오늘의 취미 활동을 기록하고 작은 성장을
            모아보세요.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <section>
            <RecordForm
              onAddRecord={handleAddRecord}
            />
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                최근 기록
              </h2>

              <span className="text-sm text-gray-500">
                총 {records.length}개
              </span>
            </div>

            {records.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-gray-500">
                  아직 작성한 기록이 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {records.map((record) => (
                  <RecordCard
                    key={record.id}
                    hobby={record.hobby}
                    title={record.title}
                    content={record.content}
                    duration={record.duration}
                    date={record.date}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default RecordPage;