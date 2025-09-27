import { InsightsView } from "./InsightsView";

export default function Insights() {
  return (
    <div className="center items-start! w-full min-h-[80dvh] pb-[8rem]">
      <div className="center flex-col! w-full max-w-screen-xl  px-4">
        <header className="center flex-col! w-full mx-auto rounded-3xl! py-6 px-4 mt-10">
          <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-r from-[#00d0ff] to-[#eddbff] text-transparent bg-clip-text">
            Smart AI Insights
          </h1>

          <p className="mt-3 text-center text-[var(--text-secondary)] max-w-2xl">
            Get personalized weather insights powered by AI, helping you plan
            your day, stay prepared, and make smarter decisions at a glance.
          </p>
        </header>
        <InsightsView />
      </div>
    </div>
  );
}
