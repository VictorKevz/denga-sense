import { MetricType } from "../types/weather";

interface MetricCardProps {
  data: MetricType;
}
export const MetricCard = ({ data }: MetricCardProps) => {
  const { label, value } = data;
  return (
    <div className="w-full bg-blue-500 rounded-xl p-5">
      <p>{label}</p>
      <h3 className="text-2xl">{value}</h3>
    </div>
  );
};
