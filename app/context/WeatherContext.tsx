"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  WeatherContextType,
  Weather,
  WeatherDataResult,
  WeatherState,
  DefaultWeatherState,
} from "@/app/types/weather";
import { useWeatherData } from "@/app/hooks/useWeatherData";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export interface WeatherProviderProps {
  children: React.ReactNode;
  initialWeather?: WeatherState;
}

export const WeatherProvider = ({
  children,
  initialWeather,
}: WeatherProviderProps) => {
  const { fetchWeather } = useWeatherData();
  const [weather, setWeather] = useState<WeatherState>(
    initialWeather || DefaultWeatherState
  );
  const [selectedPlace, setSelectedPlace] = useState<Weather | null>(
    initialWeather ? initialWeather.current : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateWeatherData = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);
      try {
        const data: WeatherDataResult | null = await fetchWeather(
          latitude,
          longitude
        );
        if (data) {
          setWeather({
            current: { ...data.current, isSSR: false },
            daily: data.daily,
            hourly: data.hourly,
          });
          setSelectedPlace({ ...data.current, isSSR: false });
        }
      } catch (err: any) {
        setError(err?.message || "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    },
    [fetchWeather]
  );

  return (
    <WeatherContext.Provider
      value={{ weather, selectedPlace, updateWeatherData, loading, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (!context)
    throw new Error("useWeatherContext must be used within WeatherProvider!");
  return context;
};
