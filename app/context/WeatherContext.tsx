"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  WeatherContextType,
  Weather,
  WeatherState,
  DefaultWeatherState,
  DefaultCoords,
} from "@/app/types/weather";
import { useWeatherData } from "@/app/hooks/useWeatherData";
import { loadFromStorage } from "./SettingsContext";

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

  const [weather, setWeather] = useState<WeatherState>(() =>
    loadFromStorage<WeatherState>(
      "weatherApp",
      initialWeather || DefaultWeatherState
    )
  );
  const [selectedPlace, setSelectedPlace] = useState<Weather | null>(
    initialWeather ? initialWeather.current : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { lat, long } = DefaultCoords;

  const updateWeatherData = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);
      try {
        const data: WeatherState | null = await fetchWeather(
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
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err?.message : "Failed to fetch weather data"
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchWeather]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && weather.current.isSSR) {
      if (!navigator.geolocation) {
        updateWeatherData(lat, long);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateWeatherData(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          updateWeatherData(lat, long);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherApp", JSON.stringify(weather));
  }, [weather]);

  useEffect(() => {
    if (!weather?.current?.time) return;
    const lastFetched = Date.parse(weather.current.time);
    const now = Date.now();
    const minutesSinceFetch = (now - lastFetched) / (1000 * 60);
    if (minutesSinceFetch > 15) {
      updateWeatherData(weather.current.latitude, weather.current.longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
