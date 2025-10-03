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
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-[var(--neutral-0)] focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <div
        className="w-full min-h-dvh relative flex flex-col bg-center bg-cover bg-no-repeat object-cover z-10"
        style={{
          backgroundImage: "var(--main-bg)",
          backgroundAttachment: "fixed",
        }}
      >
        <header className="center w-full mt-6" role="banner">
          <Link
            href="/"
            aria-label="Denga Sense - Weather Dashboard Home"
            className="focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:rounded-full"
          >
            <Image
              src="/images/logo-dark.webp"
              width={70}
              height={100}
              alt="Denga Sense Weather Dashboard Logo"
              className="glass inset rounded-full! p-1"
              priority
            />
          </Link>
        </header>

        <nav
          className="w-full center fixed bottom-4 px-4 z-20"
          role="navigation"
          aria-label="Main navigation"
        >
          <Navbar />
        </nav>

        <SettingsProvider>
          <WeatherProvider initialWeather={initialWeather}>
            <PlacesProvider>
              <main
                id="main-content"
                className="w-full"
                role="main"
                tabIndex={-1}
              >
                {children}
              </main>
            </PlacesProvider>
          </WeatherProvider>
        </SettingsProvider>

        <div
          className="overlay backdrop-blur-[0.15rem]! backdrop-saturate-150! backdrop-brightness-85 bg-black/30!"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
