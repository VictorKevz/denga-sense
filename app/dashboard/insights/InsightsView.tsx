"use client";
import { useInsights } from "@/app/hooks/useInsights";
import { Insight } from "@/app/types/insights";
import { MUIIcon } from "@/app/types/settings";
import {
  AddReaction,
  Cloud,
  HealthAndSafety,
  SportsHandball,
  Timeline,
} from "@mui/icons-material";
import React from "react";

export const InsightsView = () => {
  const { insights, loading, error } = useInsights();

  if (loading) return <p>Loading insights...</p>;
  if (error) return <p>Error: {error}</p>;

  const icons: { icon: MUIIcon; color: string }[] = [
    { icon: Cloud, color: "#24A0ED" },
    { icon: Timeline, color: "#F0FFBA" },
    { icon: SportsHandball, color: "#FFD6A5" },
    { icon: HealthAndSafety, color: "#C1C9FB" },
    { icon: AddReaction, color: "#F7C8DE" },
  ];
  return (
    <section className="center w-full mt-10">
      <ul className="w-full grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {insights.map((insight, i) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            Icon={icons[i].icon}
            color={icons[i].color}
          />
        ))}
      </ul>
    </section>
  );
};

interface InsightCard {
  insight: Insight;
  Icon: MUIIcon;
  color: string;
}

export const InsightCard = ({ insight, Icon, color }: InsightCard) => {
  return (
    <li className="glass inset w-full h-full first:col-span-2 px-4 py-6 backdrop-brightness-95!">
      <span
        className={`glass center h-12 w-12 text-[var(--neutral-900)] rounded-full`}
        style={{ background: `${color}` }}
      >
        <Icon />
      </span>
      <h3 className="text-xl font-semibold text-[var(--neutral-0)] tracking-wider">
        {insight.title}
      </h3>
      <p className="text-lg max-w-xl">{insight.description}</p>
    </li>
  );
};
