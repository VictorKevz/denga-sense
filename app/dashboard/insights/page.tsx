import Image from "next/image";
import Link from "next/link";

export default function Insights() {
  return (
    <div className="center w-full min-h-[80dvh]">
      <div className="max-w-screen-xl w-full center flex-col!">
        <Image
          src="/images/insights-placeholder.svg"
          alt=""
          width={300}
          height={350}
          className="bg-[var(--neutral-50)] p-5 rounded-2xl"
        />
        <h2 className="text-4xl text-[var(--neutral-0)] mt-8 font-semibold">
          AI-Powered Weather Insights
        </h2>
        <p className="max-w-xl w-[80%] text-[var(--neutral-200)]! mt-1 text-center">
          Smart AI insights from your local weather data help you plan better
          and stay ahead of changing conditions.
        </p>
        <Link
          href={`/dashboard/weather`}
          className="center h-14 max-w-[15rem] w-full bg-[var(--primary)] text-[var(--neutral-0)] text-xl font-semibold px-4 mt-8 rounded-full"
        >
          View Weather
        </Link>
      </div>
    </div>
  );
}
