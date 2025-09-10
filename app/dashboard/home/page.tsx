import { WeatherView } from "@/app/components/WeatherView";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "../../lib/weather";

export default async function HomePage() {
  const current = await getWeather();
  const daily = await getDailyForecast();
  const hourly = await getHourlyForecast();

  return <WeatherView current={current} daily={daily} hourly={hourly} />;
}
