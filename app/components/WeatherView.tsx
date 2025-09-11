"use client";
import React, { useEffect, useState } from "react";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "../lib/weather";
import { WeatherViewProps } from "../types/weather";

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
      });
      setWeatherDaily(dailyData);
      setWeatherHourly(hourlyData);
    });
  }, []);

  return (
    <section>
      <h1>
        {weatherCurrent.city},{weatherCurrent.country}
      </h1>
      <p>Temp: {weatherCurrent.temp}°C</p>
      <p>Feels Like: {weatherCurrent.feelsLike ?? "-"}</p>

      <ul>
        {weatherDaily.map((day) => (
          <li key={day.date}>
            <p>{day.date}</p>
            <span>{day.tempMax}</span>
            <span>{day.tempMin}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
