"use client";
import { ErroUI } from "@/app/components/ui/ErroUI";
import { LoadingGrid } from "@/app/components/ui/LoadingGrid";
import { useInsights } from "@/app/hooks/useInsights";
import { Insight } from "@/app/types/insights";
import { MUIIcon } from "@/app/types/settings";
import {
  AddReaction,
  ArrowRight,
  Attractions,
  Cloud,
  SportsHandball,
  Timeline,
} from "@mui/icons-material";
import React from "react";
import { PropagateLoader } from "react-spinners";

export const InsightsView = () => {
  const { insights, loading, error } = useInsights();

  if (error) return <ErroUI error={error} action="goHome" />;
  if (loading) {
    return (
      <LoadingGrid
        className="grid max-w-screen-xl mx-auto w-full gap-8 lg:grid-cols-2 xl:grid-cols-3"
        length={5}
        loaderClassName="glass center lg:first:col-span-2 my-4 min-h-[15rem]"
      >
        <PropagateLoader
          color="var(--primary)"
          size={20}
          speedMultiplier={1.5}
        />
      </LoadingGrid>
    );
  }
  const icons: { icon: MUIIcon; color: string }[] = [
    { icon: Cloud, color: "#24A0ED" },
    { icon: Timeline, color: "#F7C8DE" },
    { icon: SportsHandball, color: "#FFD6A5" },
    { icon: Attractions, color: "#C1C9FB" },
    { icon: AddReaction, color: "#F0FFBA " },
  ];
  return (
    <section
      className="center w-full relative mt-10 z-5"
      aria-labelledby="insights-list-heading"
    >
      <h2 id="insights-list-heading" className="sr-only">
        Insights
      </h2>
      <div
        className="w-full grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
        role="list"
      >
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
  return (
    <article
      className="glass inset-ai w-full flex flex-col justify-between lg:first:col-span-2 px-4 py-5 backdrop-brightness-95!"
      aria-labelledby={`insight-${insight.id}-title`}
      role="region"
    >
      <header className="w-full">
        <span
          className={`glass center h-12 w-12 text-[var(--neutral-900)] rounded-full`}
          style={{ background: `${color}` }}
          aria-hidden="true"
        >
          <Icon />
        </span>
        <h3
          id={`insight-${insight.id}-title`}
          className={`w-full text-xl font-semibold tracking-wider mt-2 uppercase `}
        >
          {insight.title}
        </h3>

        <p className="text-base xl:max-w-3xl">{insight.summary}</p>
      </header>
      <ul
        className="glass rounded-2xl! w-full flex flex-col gap-2 mt-4 px-3 py-5"
        role="list"
      >
        <li>
          <h4
            className="glass center font-normal text-lg w-fit px-4 h-8 rounded-lg! uppercase"
            style={{ border: `1px solid ${color}` }}
          >
            {insight.subTitle}
          </h4>
        </li>
        {insight.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center text-[var(--text-secondary)] opacity-90"
          >
            <ArrowRight className="-ml-2" aria-hidden="true" /> {feature}.
          </li>
        ))}
      </ul>
    </article>
  );
};
