"use client";
import React, { useState } from "react";
import Link from "next/link";
export const Navbar = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("/dashboard/home");

  return (
    <nav className="glass backdrop-blur-[5px] shadow-blue-500/20! shadow-2xl!  max-w-[30rem] w-full h-[3.5rem] flex items-center justify-between gap-8 px-0.5 rounded-full!">
      {navTabs.map((tab) => {
        const isActive = tab.url === currentUrl;
        return (
          <Link
            key={tab.id}
            href={tab.url}
            onClick={() => setCurrentUrl(tab.url)}
            className={`w-full center text-[var(--text-primary)] text-lg font-medium ${
              isActive
                ? " bg-[var(--primary)] text-[var(--neutral-0)]! px-4 h-[3rem] rounded-full"
                : ""
            }`}
          >
            {tab.text}
          </Link>
        );
      })}
    </nav>
  );
};

const navTabs = [
  {
    id: "1",
    url: "/dashboard/weather",
    text: "Weather",
  },
  {
    id: "2",
    url: "/dashboard/ai",
    text: "AI Insights",
  },
  {
    id: "3",
    url: "/dashboard/places",
    text: "Places",
  },
  {
    id: "4",
    url: "/dashboard/settings",
    text: "Settings",
  },
];
