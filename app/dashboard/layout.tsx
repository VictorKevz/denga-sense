import { Navbar } from "../components/Navbar";

// /app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full min-h-dvh relative flex flex-col justify-between bg-center bg-cover bg-no-repeat object-cover z-10"
      style={{ backgroundImage: "var(--main-bg)" }}
    >
      <Navbar />
      <div className="w-full">
        {children} {/* Each Tab Goes here */}
      </div>
      <div className="overlay"></div>
    </div>
  );
}
