import { PulseLoader } from "react-spinners";
import { MetricType } from "../types/weather";

interface MetricCardProps {
  data: MetricType;
  loading: boolean;
}
export const MetricCard = ({ data, loading }: MetricCardProps) => {
  const { label, value } = data;
  return (
    <div className="glass p-5 rounded-2xl!">
      {loading ? (
        <div className="w-full center py-4">
          <PulseLoader size={20} color="var(--primary)" />
        </div>
      ) : (
        <>
          <p className="text-[var(--text-secondary)]">{label}</p>
          <h3 className="text-2xl text-[var(--text-primary)] font-light">
            {value}
          </h3>
        </>
      )}
    </div>
  );
};
