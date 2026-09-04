type RecordCardProps = {
  hobby: string;
  title: string;
  content: string;
  duration: number;
  date: string;
};

function RecordCard({
  hobby,
  title,
  content,
  duration,
  date,
}: RecordCardProps) {
  return (
    <article className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
          {hobby}
        </span>

        <span className="text-sm text-gray-400">
          {date}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 leading-relaxed text-gray-600">
        {content}
      </p>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <span className="text-sm font-medium text-gray-500">
          ⏱ {duration}분 활동
        </span>
      </div>
    </article>
  );
}

export default RecordCard;