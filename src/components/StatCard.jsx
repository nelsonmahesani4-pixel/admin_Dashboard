function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-zinc-900">
            {value}
          </h3>

          <p className="mt-2 text-xs text-zinc-500">
            {description}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-100 p-3">
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;