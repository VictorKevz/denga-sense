"use client";
import Link from "next/link";
import {
  CloudRounded,
  InsightsRounded,
  MapRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="max-w-[30rem] w-full h-[4rem] glass backdrop-blur-[10px]! backdrop-saturate-150! backdrop-brightness-90! shadow-blue-500/40! shadow-2xl! flex items-center justify-between gap-8 px-0.5 rounded-full!">
      {navTabs.map((tab) => {
        const isActive = pathname === tab.url;
        return (
          <Link
            key={tab.id}
            href={tab.url}
            className={`group w-full center text-[var(--neutral-0)] md:text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--neutral-0)]! hover:px-4 hover:h-[3.5rem] hover:rounded-full ${
              isActive
                ? " bg-[var(--primary)] text-[var(--neutral-0)]! px-4 h-[3.5rem] rounded-full"
                : ""
            }`}
          >
            <span className="flex flex-col items-center">
              <tab.icon
                className={`text-[var(--neutral-200)] group-hover:text-[var(--neutral-0)]! ${
                  isActive && "text-[var(--neutral-0)]!"
                }`}
              />
              <span className="hidden md:flex">{tab.text}</span>
            </span>
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
    icon: CloudRounded,
  },
  {
    id: "2",
    url: "/dashboard/places",
    text: "Places",
    icon: MapRounded,
  },
  {
    id: "3",
    url: "/dashboard/insights",
    text: "Insights",
    icon: InsightsRounded,
  },

  {
    id: "4",
    url: "/dashboard/settings",
    text: "Settings",
    icon: SettingsRounded,
  },
];
