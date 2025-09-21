"use client";
import { WeatherOverviewCard } from "@/app/components/WeatherOverviewCard";
import { usePlaces } from "@/app/context/PlacesContext";
import { useWeatherData } from "@/app/hooks/useWeatherData";
import React, { useEffect } from "react";

export const PlacesManager = () => {
  const { places, refreshPlace } = usePlaces();
  const { fetchWeather, loading } = useWeatherData();

  // Refresh saved places on mount
  useEffect(() => {
    places.forEach(async (place) => {
      try {
        const updatedRaw = await fetchWeather(place.latitude, place.longitude);
        if (updatedRaw) {
          refreshPlace(updatedRaw.current);
        }
      } catch (err) {
        console.error(`Failed to refresh ${place.city}:`, err);
      }
    });
  }, []);

  return (
    <div className="max-w-screen-xl w-full mt-10">
      <section className="w-full">
        <div className="w-full grid xl:grid-cols-2 gap-8">
          {places.map((place) => (
            <WeatherOverviewCard
              key={place.id}
              data={place}
              loading={loading}
              height={10}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
