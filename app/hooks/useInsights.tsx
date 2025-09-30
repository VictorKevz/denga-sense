"use client";
import { useEffect, useState } from "react";
import { Insight } from "../types/insights";
import { useWeatherContext } from "../context/WeatherContext";
import { loadFromStorage } from "../context/SettingsContext";

export function useInsights() {
  const { insights: storedInsights, weatherId: storedWeatherId } =
    loadFromStorage<{ insights: Insight[]; weatherId: string }>("insights", {
      insights: [],
      weatherId: "",
    });

  const [insights, setInsights] = useState<Insight[]>(storedInsights);
  const [weatherId, setWeatherId] = useState<string>(storedWeatherId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { weather } = useWeatherContext();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ weather }),
        });
        if (!res.ok) throw new Error("Failed to fetch insights");
        const data: Insight[] = await res.json();
        setInsights(data);
        setWeatherId(weather.current.id);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    // Here I made sure that I only fetch insights if the weather has changed and I use the id of the place for identification
    if (weather.current.id && weather.current.id !== weatherId) {
      fetchInsights();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather.current.id]);

  useEffect(() => {
    localStorage.setItem("insights", JSON.stringify({ insights, weatherId }));
  }, [insights, weatherId]);

  return { insights, loading, error };
}
