"use client";

import { useState, useCallback } from "react";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "@/app/lib/weather";
import { WeatherViewProps } from "@/app/types/weather";

export function useWeatherData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(
    async (lat: number, lon: number): Promise<WeatherViewProps | null> => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/weather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lon }),
        });
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const data = await res.json();
        return data;
      } catch (err) {
        console.error(err);
        setError("Failed to load weather data.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchWeather, loading, error };
}
