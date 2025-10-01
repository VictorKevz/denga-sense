"use client";
import { WeatherOverviewCard } from "@/app/components/WeatherOverviewCard";
import { usePlaces } from "@/app/context/PlacesContext";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { useRecommendedPlaces } from "@/app/hooks/useRecommendedPlaces";
import { useWeatherData } from "@/app/hooks/useWeatherData";
import Image from "next/image";
import React, { useEffect } from "react";
import { PlacePreviewCard } from "./PlacePreviewCard";
import { LoadingGrid } from "@/app/components/ui/LoadingGrid";
import { ErroUI } from "@/app/components/ui/ErroUI";

export const PlacesManager = () => {
  const { places, refreshPlace } = usePlaces();
  const { updateWeatherData } = useWeatherContext();
  const { fetchWeather, loading, error } = useWeatherData();
  const {
    placePreviews,
    loading: loadingRecommended,
    error: errorRecommended,
  } = useRecommendedPlaces();

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
  if (error) {
    return <ErroUI error={error} action="goHome" />;
  }
  if (places.length === 0) {
    return (
      <section
        className="w-full center flex-col!"
        aria-labelledby="empty-places-heading"
      >
        <Image
          src="/images/empty-places.svg"
          alt=""
          width={300}
          height={350}
          className="bg-[var(--neutral-50)] p-5 rounded-2xl"
          aria-hidden
        />
        <h2
          id="empty-places-heading"
          className="text-4xl text-[var(--neutral-0)] mt-8 font-semibold"
        >
          No Places Saved (0)
        </h2>
        <p className="text-[var(--neutral-200)]! mt-1">
          Your saved places will appear here
        </p>
      </section>
    );
  }
  return (
    <div className="max-w-screen-2xl w-full mt-10">
      <section
        className="w-full glass px-5 py-6"
        aria-labelledby="saved-places-heading"
      >
        <h2
          id="saved-places-heading"
          className="text-2xl sm:text-4xl text-[var(--text-primary)]"
        >
          Your Saved Places ({places.length})
        </h2>
        <p className="text-xl! max-w-4xl">
          Here you can view and manage all the places you have saved. Stay
          updated with the latest weather information for each location. To
          remove a place, simply click on the bookmark icon.
        </p>
        {loading ? (
          <LoadingGrid
            className="mx-auto mt-8 max-w-screen-xl w-full grid gap-8 md:grid-cols-2 xl:grid-cols-4"
            length={4}
          />
        ) : (
          <ul className="w-full grid xl:grid-cols-2 gap-8 mt-8" role="list">
            {places.map((place) => (
              <li key={place.id} className="list-none">
                <WeatherOverviewCard
                  data={place}
                  onWeatherUpdate={updateWeatherData}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        className="w-full glass px-5 py-6 mt-8"
        aria-labelledby="smart-recommendations-heading"
      >
        <header>
          <h2
            id="smart-recommendations-heading"
            className="text-2xl sm:text-4xl text-[var(--text-primary)]"
          >
            Smart Recommendations
          </h2>
          <p className="max-w-4xl text-xl! mt-1.5">
            Personalized suggestions, just for you. These AI-powered
            recommendations use your saved places and recent searches to
            highlight destinations you might enjoy complete with live weather
            snapshots.
          </p>
        </header>
        {errorRecommended && (
          <ErroUI error={errorRecommended} action="goHome" />
        )}
        {loadingRecommended && !errorRecommended ? (
          <LoadingGrid
            className="max-w-screen-xl w-full grid gap-8 md:grid-cols-2 xl:grid-cols-4 mx-auto mt-8"
            length={4}
          />
        ) : (
          <ul
            className="w-full grid gap-8 md:grid-cols-2 xl:grid-cols-4 mt-8"
            role="list"
          >
            {placePreviews.map((place) => (
              <li key={place.id} className="list-none">
                <PlacePreviewCard data={place} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
