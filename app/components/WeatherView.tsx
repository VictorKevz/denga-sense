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

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const [currentData, dailyData, hourlyData] = await Promise.all([
        getWeather(latitude, longitude),
        getDailyForecast(latitude, longitude),
        getHourlyForecast(latitude, longitude),
      ]);
      setWeatherCurrent(currentData);
      setWeatherDaily(dailyData);
      setWeatherHourly(hourlyData);
    });
  }, []);

  return (
    <section>
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
