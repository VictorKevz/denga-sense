import { MetricType } from "../types/weather";

interface MetricCardProps {
  data: MetricType;
}
export const MetricCard = ({ data }: MetricCardProps) => {
  const { label, value } = data;
  return (
    <div className="card p-5 ">
      <p className="text-[var(--text-secondary)]">{label}</p>
      <h3 className="text-2xl text-[var(--text-primary)] font-light">
        {value}
      </h3>
    </div>
  );
};
