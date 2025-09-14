import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeButton";
import Image from "next/image";
export const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between py-8 px-4 md:px-6 ">
      <Image
        src="/images/logo.svg"
        alt="Company's logo"
        width={100}
        height={100}
        className=""
      />
      <nav className="glass max-w-sm w-full flex items-center justify-between gap-8 px-6 h-[3rem]">
        {navTabs.map((tab) => {
          return (
            <Link
              key={tab.id}
              href={tab.url}
              className="text-[var(--text-primary)] text-lg"
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
