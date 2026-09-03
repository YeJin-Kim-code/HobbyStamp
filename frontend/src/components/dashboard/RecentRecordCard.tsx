type RecentRecordCardProps = {
  hobby: string;
  title: string;
  date: string;
};

function RecentRecordCard({
  hobby,
  title,
  date,
}: RecentRecordCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-orange-100 bg-white p-4">
      <div>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
          {hobby}
        </span>

        <h3 className="mt-2 font-semibold text-gray-800">
          {title}
        </h3>
      </div>

      <p className="text-sm text-gray-400">
        {date}
      </p>
    </div>
  );
}

export default RecentRecordCard;