import Link from "next/link";

// /app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-blue-950">
      <div className="flex items-start gap-12 w-full">
        <aside className="w-[8rem] flex flex-col items-center justify-between h-dvh bg-blue-900 pb-8 rounded-r-4xl">
          <header className="w-full bg-blue-300 h-22 rounded-r-3xl"></header>
          <nav className="w-full flex flex-col gap-4 px-4">
            {navTabs.map((tab) => {
              return (
                <Link key={tab.id} href={tab.url} className="text-white">
                  {tab.text}
                </Link>
              );
            })}
          </nav>
          <div className="w-full flex items-center justify-center pt-5 border-t border-amber-50/30">
            <span className="h-15 w-15 bg-red-700 rounded-full"></span>
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
