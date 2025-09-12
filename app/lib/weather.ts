// /lib/weather.ts
import { Weather, ForecastDay, ForecastHour } from "../types/weather";

const FALLBACK = { latitude: 60.1699, longitude: 24.9384 };

export async function getWeather(
  latitude = FALLBACK.latitude,
  longitude = FALLBACK.longitude
): Promise<Weather> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  console.log("Weather Data", data);
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    temp: data.current_weather.temperature,
    windspeed: data.current_weather.windspeed,
    time: data.current_weather.time,
  };
}

export async function getDailyForecast(
  latitude = FALLBACK.latitude,
  longitude = FALLBACK.longitude
): Promise<ForecastDay[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data.daily.time.map((date: string, idx: number) => ({
    date,
    tempMax: data.daily.temperature_2m_max[idx],
    tempMin: data.daily.temperature_2m_min[idx],
    weatherCode: data.daily.weathercode[idx],
  }));
}

export async function getHourlyForecast(
  latitude = FALLBACK.latitude,
  longitude = FALLBACK.longitude
): Promise<ForecastHour[]> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m,relative_humidity_2m`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return data.hourly.time.map((time: string, idx: number) => ({
    time,
    temp: data.hourly.temperature_2m[idx],
    windspeed: data.hourly.windspeed_10m[idx],
    precipitation: data.hourly.precipitation[idx],
    feelsLike: data.hourly.apparent_temperature[idx],
    humidity: data.hourly.relative_humidity_2m[idx],
  }));
}
