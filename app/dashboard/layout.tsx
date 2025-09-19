import { Navbar } from "../components/Navbar";
import { SettingsProvider } from "../context/SettingsContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full min-h-dvh relative flex flex-col bg-center bg-cover bg-no-repeat object-cover z-10"
      style={{ backgroundImage: "var(--main-bg)" }}
    >
      <SettingsProvider>
        <Navbar />
        <div className="w-full">{children}</div>
      </SettingsProvider>
      <div className="overlay backdrop-blur-[0.25rem]"></div>
    </div>
  );
}
