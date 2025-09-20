import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { SettingsProvider } from "../context/SettingsContext";
import Link from "next/link";

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
        <div className="w-full center fixed bottom-4">
          <Navbar />
        </div>

        <div className="w-full">{children}</div>
      </SettingsProvider>
      <div className="overlay backdrop-blur-[15px]! backdrop-saturate-150! backdrop-brightness-90 bg-black/30!"></div>
    </div>
  );
}
