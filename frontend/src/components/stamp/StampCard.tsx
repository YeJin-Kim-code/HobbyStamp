interface StampCardProps {
  icon: string;
  title: string;
  description: string;
  hobbyName: string;
  createdAt: string;
}

function StampCard({
  icon,
  title,
  description,
  hobbyName,
  createdAt,
}: StampCardProps) {
  const formattedDate =
    new Date(createdAt).toLocaleDateString(
      "ko-KR",
    );

  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-200 text-3xl">
          {icon}
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          획득 완료
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      <div className="mt-5 rounded-xl bg-white p-3">
        <p className="text-xs text-gray-400">
          취미
        </p>

        <p className="mt-1 font-semibold text-gray-700">
          {hobbyName}
        </p>
      </div>

      <p className="mt-4 text-xs text-gray-400">
        획득일 {formattedDate}
      </p>
    </div>
  );
}

export default StampCard;