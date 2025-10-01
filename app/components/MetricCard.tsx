import { PulseLoader } from "react-spinners";
import { MetricType } from "../types/weather";

interface MetricCardProps {
  data: MetricType;
  loading: boolean;
}
export const MetricCard = ({ data, loading }: MetricCardProps) => {
  const { label, value } = data;
  return (
    <div
      className="glass p-5 rounded-2xl!"
      aria-busy={loading}
      aria-label={`${label} metric`}
    >
      {loading ? (
        <div className="w-full center py-4" aria-live="polite">
          <PulseLoader size={20} color="var(--primary)" />
          <span className="sr-only">Loading {label}…</span>
        </div>
      ) : (
        <dl>
          <dt className="text-[var(--text-secondary)]">{label}</dt>
          <dd className="text-2xl text-[var(--text-primary)] font-light">
            {value}
          </dd>
        </dl>
      )}
    </div>
  );
};
