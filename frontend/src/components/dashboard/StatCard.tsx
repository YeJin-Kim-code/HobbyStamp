type StatCardProps = {
  title: string;
  value: number;
  unit: string;
};

function StatCard({ title, value, unit }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <div className="mt-2 flex items-end gap-1">
        <span className="text-3xl font-bold text-gray-800">
          {value}
        </span>

        <span className="mb-1 text-sm text-gray-500">
          {unit}
        </span>
      </div>
    </div>
  );
}

export default StatCard;