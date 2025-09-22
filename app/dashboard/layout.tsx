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
        <header className="center w-full mt-6">
          <Link href={"/"}>
            <Image
              src={`/images/logo-dark.webp`}
              width={70}
              height={100}
              alt="Company's logo"
              className="glass inset rounded-full! p-1"
            />
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
