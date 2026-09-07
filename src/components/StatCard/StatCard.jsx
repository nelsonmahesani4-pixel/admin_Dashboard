import "./StatCard.css";

function StatCard({
  title,
  value,
  description,
  icon,
  type,
}) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-top">
        <span>{title}</span>

        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;