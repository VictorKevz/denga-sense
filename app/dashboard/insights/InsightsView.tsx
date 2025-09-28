"use client";
import { useInsights } from "@/app/hooks/useInsights";
import { Insight } from "@/app/types/insights";
import { MUIIcon } from "@/app/types/settings";
import {
  AddReaction,
  ArrowRight,
  Cloud,
  HealthAndSafety,
  SportsHandball,
  Timeline,
} from "@mui/icons-material";
import React from "react";
import { PulseLoader } from "react-spinners";

export const InsightsView = () => {
  const { insights, loading, error } = useInsights();

  if (error) return <p>Error: {error}</p>;
  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto w-full grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="glass center w-full my-4 min-h-[10rem]">
            <PulseLoader color="var(--primary)" />
          </div>
        ))}
      </div>
    );
  }
  const icons: { icon: MUIIcon; color: string }[] = [
    { icon: Cloud, color: "#24A0ED" },
    { icon: Timeline, color: "#F0FFBA" },
    { icon: SportsHandball, color: "#FFD6A5" },
    { icon: HealthAndSafety, color: "#C1C9FB" },
    { icon: AddReaction, color: "#F7C8DE" },
  ];
  return (
    <section className="center w-full relative mt-10 z-5">
      <div className="w-full grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight, i) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            Icon={icons[i].icon}
            color={icons[i].color}
          />
        ))}
      </div>
    </section>
  );
};

interface InsightCard {
  insight: Insight;
  Icon: MUIIcon;
  color: string;
}

export const InsightCard = ({ insight, Icon, color }: InsightCard) => {
  const isOverview = insight.id === 1;
  return (
    <article className="glass w-full flex flex-col justify-between lg:first:col-span-2 px-4 py-5 backdrop-brightness-95!">
      <header className="w-full">
        <span
          className={`glass center h-12 w-12 text-[var(--neutral-900)] rounded-full`}
          style={{ background: `${color}` }}
        >
          <Icon />
        </span>
        <h3 className="text-xl font-semibold text-[var(--neutral-0)] tracking-wider mt-2">
          {insight.title}
        </h3>

        <p className="text-base max-w-2xl">{insight.summary}</p>
      </header>
      <ul className="glass ai-inset rounded-2xl! w-full flex flex-col gap-2 mt-4 px-3 py-5">
        <li>
          <h4
            className="glass center font-bold text-lg w-fit px-4 h-8 rounded-lg!"
            style={{ border: `1px solid ${color}` }}
          >
            {insight.subTitle}
          </h4>
        </li>
        {insight.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center text-[var(--neutral-200)]"
          >
            <ArrowRight className="-ml-2" /> {feature}
          </li>
        ))}
      </ul>
    </article>
  );
};
