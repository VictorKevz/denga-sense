import { WeatherView } from "@/app/dashboard/weather/WeatherView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Weather Dashboard | Denga Sense",
  description:
    "Check live weather, forecasts, and AI smart insights for your favorite places.",
  openGraph: {
    title: "Weather Dashboard | Denga Sense",
    description:
      "Check live weather, forecasts, and insights for your favorite places.",
    // images: [""],
  },
};

export default function HomePage() {
  return <WeatherView />;
}
