"use client";
import { useEffect, useState } from "react";
import { Insight } from "../types/insights";
import { useWeatherContext } from "../context/WeatherContext";

export function useInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
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
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return { insights, loading, error };
}
