import Link from "next/link";
import { ThemeToggle } from "../components/ThemeButton";
import Image from "next/image";

// /app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex items-start gap-12 w-full">
        <aside className="w-[8rem] flex flex-col items-center justify-between h-dvh bg-[var(--bg-secondary)] pb-8 rounded-r-4xl shadow-2xl shadow-blue-300/20">
          <header className="w-full bg-[var(--primary)] h-22 rounded-r-3xl"></header>
          <nav className="w-full flex flex-col gap-4 px-4">
            {navTabs.map((tab) => {
              return (
                <Link
                  key={tab.id}
                  href={tab.url}
                  className="text-[var(--text-primary)]"
                >
                  {tab.text}
                </Link>
              );
            })}
          </nav>
          <div className="w-full center flex-col!">
            <ThemeToggle />
            <div className="w-full center border-t pt-5 mt-5 border-t-[var(--border)]">
              <span className=" rounded-full">
                <Image
                  src="/images/profile.png"
                  alt="Victor's profile picture"
                  width={55}
                  height={55}
                  className="rounded-full"
                />
              </span>
            </div>
          </div>
        </aside>
        <div className="w-full">
          {children} {/* Each Tab Goes here */}
        </div>
      </div>
    </div>
  );
}

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
