"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeButton";
import { useTheme } from "next-themes";
export const Navbar = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("/dashboard/home");
  const { resolvedTheme } = useTheme();
  if (!resolvedTheme) return null;
  return (
    <header className="max-w-screen-xl mx-auto w-full flex items-center justify-between pt-8 px-4 md:px-6 ">
      <div className="flex items-center gap-0.5">
        <img
          src={`/images/logo-${resolvedTheme}.webp`}
          alt="Company's logo"
          className="w-[4rem] h-auto"
        />
        <span className="font-bold text-xl text-[var(--neutral-0)]">
          DengaSense
        </span>
      </div>

      <nav className="glass max-w-sm w-full h-[3rem] flex items-center justify-between gap-8 px-5 ">
        {navTabs.map((tab) => {
          const isActive = tab.url === currentUrl;
          return (
            <Link
              key={tab.id}
              href={tab.url}
              onClick={() => setCurrentUrl(tab.url)}
              className={`text-[var(--text-primary)] text-lg ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--neutral-0)]! px-3 rounded-sm"
                  : ""
              }`}
            >
              {tab.text}
            </Link>
          );
        })}
      </nav>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
};

const navTabs = [
  {
    id: "1",
    url: "/dashboard/home",
    text: "Home",
  },
  {
    id: "2",
    url: "/dashboard/favorites",
    text: "Favorites",
  },
  {
    id: "3",
    url: "/dashboard/settings",
    text: "Settings",
  },
];
