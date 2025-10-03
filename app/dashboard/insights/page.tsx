import { InsightsView } from "./InsightsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Weather Insights | Denga Sense",
  description:
    "Personalized, AI-powered weather insights to help you plan your day.",
  openGraph: {
    title: "AI Weather Insights | Denga Sense",
    description:
      "Personalized weather insights to help you plan and stay prepared.",
  },
  alternates: { canonical: "/dashboard/insights" },
};

export default function Insights() {
  return (
    <div className="center items-start! w-full min-h-[80dvh] pb-[8rem]">
      <div className="center flex-col! w-full max-w-screen-2xl  px-4">
        <header className="center flex-col! w-full mx-auto rounded-3xl! py-6 px-4 mt-10">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-[#00d0ff] to-[#eddbff] text-transparent bg-clip-text md:tracking-widest uppercase">
            Smart AI Insights
          </h1>

          <p className="mt-3 text-center text-xl! text-[var(--neutral-0)]! max-w-2xl">
            Get personalized weather insights powered by AI, helping you plan
            your day, stay prepared, and make smarter decisions at a glance.
          </p>
        </header>
        <InsightsView />
      </div>
    </div>
  );
}
