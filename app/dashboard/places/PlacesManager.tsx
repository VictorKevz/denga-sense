"use client";
import { WeatherOverviewCard } from "@/app/components/WeatherOverviewCard";
import { usePlaces } from "@/app/context/PlacesContext";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { useWeatherData } from "@/app/hooks/useWeatherData";
import Image from "next/image";
import React, { useEffect } from "react";

export const PlacesManager = () => {
  const { places, refreshPlace } = usePlaces();
  const { updateWeatherData } = useWeatherContext();
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
  if (places.length === 0) {
    return (
      <div className="w-full center flex-col!">
        <Image
          src="/images/empty-places.svg"
          alt=""
          width={300}
          height={350}
          className="bg-[var(--neutral-50)] p-5 rounded-2xl"
        />
        <h2 className="text-4xl text-[var(--neutral-0)] mt-8 font-semibold">
          No Places Saved (0)
        </h2>
        <p className="text-[var(--neutral-200)]! mt-1">
          Your saved places will appear here
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-screen-xl w-full mt-10">
      <section className="w-full">
        <div className="w-full grid xl:grid-cols-2 gap-8">
          {places.map((place) => (
            <WeatherOverviewCard
              key={place.id}
              data={place}
              loading={loading}
              onWeatherUpdate={updateWeatherData}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
