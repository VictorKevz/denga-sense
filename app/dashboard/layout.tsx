import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { SettingsProvider } from "../context/SettingsContext";
import Link from "next/link";
import { PlacesProvider } from "../context/PlacesContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full min-h-dvh relative flex flex-col bg-center bg-cover bg-no-repeat object-cover z-10"
      style={{
        backgroundImage: "var(--main-bg)",
        backgroundAttachment: "fixed",
      }}
    >
      <SettingsProvider>
        <header className="center w-full mt-2">
          <Link href={"/"} className="flex items-center -gap-0.5">
            <Image
              src={`/images/logo-dark.webp`}
              width={70}
              height={100}
              alt="Company's logo"
            />
            <span className="font-bold text-2xl text-[var(--neutral-0)]">
              DengaSense
            </span>
          </Link>
        </header>
        <div className="w-full center fixed bottom-4 px-4 z-20">
          <Navbar />
        </div>
        <PlacesProvider>
          <div className="w-full">{children}</div>
        </PlacesProvider>
      </SettingsProvider>
      <div className="overlay backdrop-blur-[2.5px]! backdrop-saturate-150! backdrop-brightness-85 bg-black/30!"></div>
    </div>
  );
}
