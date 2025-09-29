"use client";
import { WeatherOverviewCard } from "@/app/components/WeatherOverviewCard";
import { usePlaces } from "@/app/context/PlacesContext";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { useRecommendedPlaces } from "@/app/hooks/useRecommendedPlaces";
import { useWeatherData } from "@/app/hooks/useWeatherData";
import Image from "next/image";
import React, { useEffect } from "react";
import { PlacePreviewCard } from "./PlacePreviewCard";
import { PulseLoader } from "react-spinners";

export const PlacesManager = () => {
  const { places, refreshPlace } = usePlaces();
  const { updateWeatherData } = useWeatherContext();
  const { fetchWeather, loading } = useWeatherData();
  const {
    placePreviews,
    loading: loadingRecommended,
    error,
  } = useRecommendedPlaces();
  /**
   * Stale Data Refresh Logic:
   * - On mount, refresh each saved place only if its weather data is older than 15 minutes.
   * - Uses the `time` field from the Weather type, which is an ISO UTC string from the API.
   * - Compares UTC timestamps: both `Date.now()` and `Date.parse(place.time)` are in UTC.
   * - This ensures freshness checks are accurate regardless of the user's or place's local timezone.
   */
  useEffect(() => {
    const STALE_THRESHOLD_MINUTES = 15;
    const nowUtc = Date.now();
    places.forEach(async (place) => {
      const lastFetched = place.time ? Date.parse(place.time) : 0;
      const minutesSinceFetch = (nowUtc - lastFetched) / (1000 * 60);
      if (minutesSinceFetch > STALE_THRESHOLD_MINUTES) {
        try {
          const updatedRaw = await fetchWeather(
            place.latitude,
            place.longitude
          );
          if (updatedRaw) {
            refreshPlace(updatedRaw.current);
          }
        } catch (err) {
          console.error(`Failed to refresh ${place.city}:`, err);
        }
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
    <div className="max-w-screen-2xl w-full mt-10">
      <section className="w-full glass px-5 py-6">
        <h3 className="text-4xl text-[var(--text-primary)]">
          Your Saved Places ({places.length})
        </h3>
        <p className="text-xl! max-w-4xl">
          Here you can view and manage all the places you have saved. Stay
          updated with the latest weather information for each location. To
          remove a place, simply click on the bookmark icon.
        </p>
        <div className="w-full grid xl:grid-cols-2 gap-8 mt-8">
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

      <section className="w-full glass px-5 py-6 mt-8">
        <header>
          <h3 className="text-4xl text-[var(--text-primary)]">
            Smart Recommendations
          </h3>
          <p className="max-w-4xl text-xl! mt-1.5">
            Personalized suggestions, just for you. These AI-powered
            recommendations use your saved places and recent searches to
            highlight destinations you might enjoy complete with live weather
            snapshots.
          </p>
        </header>
        {loadingRecommended ? (
          <div className="max-w-screen-xl mx-auto w-full grid gap-8 md:grid-cols-2 xl:grid-cols-4 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass center w-full my-4 min-h-[15rem]">
                <PulseLoader color="var(--primary)" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full grid gap-8 md:grid-cols-2 xl:grid-cols-4 mt-8">
            {placePreviews.map((place) => (
              <PlacePreviewCard
                key={place.id}
                data={place}
                loading={loadingRecommended}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
