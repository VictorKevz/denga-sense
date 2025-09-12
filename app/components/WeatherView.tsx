"use client";
import React, { useEffect, useState } from "react";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "../lib/weather";
import { MetricType, WeatherViewProps } from "../types/weather";
import { WeatherOverviewCard } from "./WeatherOverviewCard";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { MetricCard } from "./MetricCard";

export const WeatherView = ({ current, daily, hourly }: WeatherViewProps) => {
  const [weatherCurrent, setWeatherCurrent] = useState(current);
  const [weatherDaily, setWeatherDaily] = useState(daily);
  const [weatherHourly, setWeatherHourly] = useState(hourly);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Inside this useEffect I am detecting the user's geo coordinates,
    // I am using these coordinates to fetch the city, and country details using BigDataCloud API
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const [currentData, dailyData, hourlyData] = await Promise.all([
        getWeather(latitude, longitude),
        getDailyForecast(latitude, longitude),
        getHourlyForecast(latitude, longitude),
      ]);
      const geoRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
      );
      const geoData = await geoRes.json();
      console.log("Geo Data:", geoData);
      const city = geoData.city;
      const country = geoData.countryName;

      setWeatherCurrent({
        ...currentData,
        city,
        country,
        precipitation: hourlyData[0]?.precipitation,
        humidity: hourlyData[0]?.humidity,
        feelsLike: hourly[0]?.feelsLike,
      });
      setWeatherDaily(dailyData);
      setWeatherHourly(hourlyData);
    });
  }, []);

  // temporary array data
  const metricData: MetricType[] = [
    {
      label: "Feels Like",
      value: `${weatherCurrent.feelsLike}°`,
    },
    {
      label: "Humidity",
      value: `${weatherCurrent.humidity}%`,
    },
    {
      label: "Wind",
      value: `${weatherCurrent.windspeed} km/h`,
    },
    {
      label: "Precipitation",
      value: `${weatherCurrent.precipitation} mm`,
    },
  ];
  return (
    <section className="max-w-screen-xl w-full mx-auto h-dvh py-8 px-4 lg:px-8 text-white">
      <header className="w-full min-h-20 p-6 border border-amber-700">
        Header goes here
      </header>
      <div className="w-full max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-8">
        <div className="w-full lg:col-span-2">
          <WeatherOverviewCard data={weatherCurrent} />
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {metricData.map((metric) => (
              <MetricCard key={metric.label} data={metric} />
            ))}
          </div>
        </div>

        <div className="w-full h-full bg-blue-400">
          Hourly forecast card here
        </div>
      </div>
    </section>
  );
};
