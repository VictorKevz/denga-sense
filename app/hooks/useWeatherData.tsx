"use client";

import { useState, useCallback } from "react";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "@/app/lib/weather";
import { WeatherDataResult } from "@/app/types/weather";

export function useWeatherData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(
    async (lat: number, lon: number): Promise<WeatherDataResult | null> => {
      try {
        setLoading(true);
        setError(null);

        const [currentData, dailyData, hourlyData] = await Promise.all([
          getWeather(lat, lon),
          getDailyForecast(lat, lon),
          getHourlyForecast(lat, lon),
        ]);

        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
        );
        if (!geoRes.ok) throw new Error("Failed to fetch location details");
        const geoData = await geoRes.json();

        return {
          current: {
            ...currentData,
            city: geoData.city,
            country: geoData.countryName,
            precipitation: hourlyData[0]?.precipitation,
            humidity: hourlyData[0]?.humidity,
            feelsLike: hourlyData[0]?.feelsLike,
          },
          daily: dailyData,
          hourly: hourlyData,
        };
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
