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
    <div className="max-w-screen-xl w-full grid lg:grid-cols-5 gap-10">
      <section className="w-full lg:col-span-2">
        <h2 className="text-3xl sm:text-5xl">Places</h2>
        <div className="flex flex-col gap-8">
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
      <section className="w-full lg:col-span-3 h-full glass"></section>
    </div>
  );
};
