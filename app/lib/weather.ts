// /lib/weather.ts
import { Weather, ForecastDay, ForecastHour } from "../types/weather";

const FALLBACK = { latitude: 60.1699, longitude: 24.9384 };

export async function getWeather(
  latitude = FALLBACK.latitude,
  longitude = FALLBACK.longitude
): Promise<Weather> {
  // I fetch current weather here.
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const weatherRes = await fetch(weatherUrl, { cache: "no-store" });
  const weatherData = await weatherRes.json();

  // I fetch reverse geocoding for city and country here (Nominatim)
  const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  const geoRes = await fetch(geoUrl, {
    headers: { "User-Agent": "denga-sense-app/1.0" },
  });
  const geoData = await geoRes.json();
  const address = geoData.address || {};
  const countryRaw = address.country || "";
  const country = countryRaw.includes("/")
    ? countryRaw.split("/")[1].trim()
    : countryRaw.trim();
  const city = address.city || "";

  return {
    id: `${weatherData.latitude},${weatherData.longitude}`,
    latitude: weatherData.latitude,
    longitude: weatherData.longitude,
    temp: weatherData?.current_weather?.temperature,
    windspeed: weatherData.current_weather.windspeed,
    time: weatherData.current_weather.time,
    weatherCode: weatherData.current_weather.weathercode,
    city,
    country,
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
  const today = new Date();
  const sixDaysLater = new Date(today);
  sixDaysLater.setDate(today.getDate() + 6);

  const start = today.toISOString().split("T")[0];
  const end = sixDaysLater.toISOString().split("T")[0];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m,relative_humidity_2m,weathercode&temperature_unit=celsius&windspeed_unit=kmh&precipitation_unit=mm&start_date=${start}&end_date=${end}&timezone=auto`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  return data?.hourly?.time?.map((t: string, idx: number) => ({
    time: t,
    temp: data.hourly.temperature_2m[idx],
    feelsLike: data.hourly.apparent_temperature[idx],
    windspeed: data.hourly.windspeed_10m[idx],
    precipitation: data.hourly.precipitation[idx],
    humidity: data.hourly.relative_humidity_2m?.[idx],
    weatherCode: data.hourly.weathercode?.[idx],
  }));
}

export async function searchPlace(query: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    query
  )}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch cities");
  const data = await res.json();
  console.log("Search Data:", data);
  return data.results || [];
}
