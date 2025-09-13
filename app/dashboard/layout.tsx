import { Navbar } from "../components/Navbar";

// /app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full min-h-dvh bg-cover bg-no-repeat object-cover "
      style={{ backgroundImage: "var(--main-bg)" }}
    >
      <Navbar />
      <div className="w-full px-4 pb-8 md:px-6">
        {children} {/* Each Tab Goes here */}
      </div>
    </div>
  );
}
