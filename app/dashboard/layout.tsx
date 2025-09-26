import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { SettingsProvider } from "../context/SettingsContext";
import Link from "next/link";
import { PlacesProvider } from "../context/PlacesContext";
import { WeatherProvider } from "../context/WeatherContext";
import {
  getDailyForecast,
  getHourlyForecast,
  getWeather,
} from "../lib/weather";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await getWeather();
  const daily = await getDailyForecast();
  const hourly = await getHourlyForecast();

  const initialWeather = {
    current: {
      ...current,
      city: current.city || "Oulu",
      country: current.country || "Finland",
      precipitation: current.precipitation ?? 0,
      isSSR: true,
    },
    daily,
    hourly,
  };

  return (
    <div
      className="w-full min-h-dvh relative flex flex-col bg-center bg-cover bg-no-repeat object-cover z-10"
      style={{
        backgroundImage: "var(--main-bg)",
        backgroundAttachment: "fixed",
      }}
    >
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
      <SettingsProvider>
        <WeatherProvider initialWeather={initialWeather}>
          <PlacesProvider>
            <div className="w-full">{children}</div>
          </PlacesProvider>
        </WeatherProvider>
      </SettingsProvider>
      <div className="overlay backdrop-blur-[0.15rem]! backdrop-saturate-150! backdrop-brightness-85 bg-black/30!"></div>
    </div>
  );
}
