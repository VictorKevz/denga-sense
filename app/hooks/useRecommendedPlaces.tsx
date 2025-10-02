"use client";
import { useEffect, useState } from "react";
import { PlaceResult, PlacePreview } from "../types/weather";
// import { loadFromStorage } from "../context/SettingsContext";
import { usePlaces } from "../context/PlacesContext";

export function useRecommendedPlaces() {
  // This state holds all recommended places with weather for preview cards
  const [placePreviews, setPlacePreviews] = useState<PlacePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { searchHistory, places } = usePlaces();

  const minimalPlaces: PlaceResult[] = places.map((place) => ({
    id: Number(place.id!),
    latitude: place.latitude!,
    longitude: place.longitude!,
    name: place.city!,
    country: place.country!,
  }));

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        // 1. First we fetch recommended places from the AI model
        const res = await fetch("/api/places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ minimalPlaces, searchHistory }),
        });
        if (!res.ok) throw new Error("Failed to fetch recommended places");
        const placesData: PlaceResult[] = await res.json();

        // 2. Then we fetch weather for each recommended place in parallel
        const weatherResults = await Promise.all(
          placesData.map(async (place) => {
            try {
              const weatherRes = await fetch("/api/weather", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  lat: place.latitude,
                  lon: place.longitude,
                }),
              });
              if (!weatherRes.ok) throw new Error("Weather fetch failed");
              const weather = await weatherRes.json();
              return {
                ...place,
                weatherCode:
                  weather.current?.weatherCode ?? weather.current?.weathercode,
                temperature:
                  weather.current?.temp ?? weather.current?.temperature,
                time: weather.current?.time,
              } as PlacePreview;
            } catch (err) {
              // If weather fetch fails, still return place info (with undefined weatherCode)
              return {
                ...place,
                weatherCode: undefined,
                temperature: undefined,
                time: undefined,
              } as PlacePreview;
            }
          })
        );

        setPlacePreviews(weatherResults);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (places.length !== 0) {
      fetchPreviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { placePreviews, loading, error };
}
