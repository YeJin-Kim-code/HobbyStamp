import { useState } from "react";

import HobbyCard from "../components/hobby/HobbyCard";

interface Hobby {
  id: number;
  name: string;
  description: string | null;
  isPinned: boolean;
}

const initialHobbies: Hobby[] = [
  {
    id: 1,
    name: "독서",
    description: "책을 읽고 생각과 감상을 기록해보세요.",
    isPinned: true,
  },
  {
    id: 2,
    name: "러닝",
    description: "달린 거리와 시간을 기록하며 성장해보세요.",
    isPinned: true,
  },
  {
    id: 3,
    name: "그림",
    description: "그림을 그리고 꾸준히 작업 과정을 기록해보세요.",
    isPinned: false,
  },
  {
    id: 4,
    name: "요리",
    description: "새로운 요리에 도전하고 나만의 레시피를 기록해보세요.",
    isPinned: false,
  },
  {
    id: 5,
    name: "영화 감상",
    description: "인상 깊었던 영화와 감상을 남겨보세요.",
    isPinned: false,
  },
  {
    id: 6,
    name: "사진",
    description: "일상 속 순간을 사진으로 남기고 기록해보세요.",
    isPinned: false,
  },
];

function HobbyPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>(initialHobbies);

  const handleTogglePin = (hobbyId: number) => {
    setHobbies((currentHobbies) =>
      currentHobbies.map((hobby) =>
        hobby.id === hobbyId
          ? {
              ...hobby,
              isPinned: !hobby.isPinned,
            }
          : hobby,
      ),
    );
  };

  const pinnedCount = hobbies.filter(
    (hobby) => hobby.isPinned,
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* 페이지 소개 */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800">
          취미 둘러보기
        </h1>

        <p className="mt-2 text-gray-500">
          좋아하는 취미를 선택하고 HobbyStamp에서 기록해보세요.
        </p>
      </section>

      {/* 선택한 취미 개수 */}
      <section className="mt-8 rounded-2xl bg-orange-100 p-5">
        <p className="text-sm font-medium text-orange-600">
          내가 선택한 취미
        </p>

        <p className="mt-1 text-2xl font-bold text-gray-800">
          {pinnedCount}개
        </p>
      </section>

      {/* 취미 목록 */}
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          전체 취미
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((hobby) => (
            <HobbyCard
              key={hobby.id}
              name={hobby.name}
              description={hobby.description}
              isPinned={hobby.isPinned}
              onTogglePin={() => handleTogglePin(hobby.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HobbyPage;