"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "../lib/weather";
import { DayOptions, ForecastHour, WeatherViewProps } from "../types/weather";
import { WeatherOverviewCard } from "./WeatherOverviewCard";
import { MetricCard } from "./MetricCard";
import { DailyForecastCard } from "./DailyForecastCard";
import {
  formatDayOfWeek,
  formatPrecip,
  formatTemp,
  formatWind,
} from "../utils/formatters";
import { MetricCardProps, UnitsState } from "../types/units";
import { HourlyForecastCard } from "./HourlyForecastCard";
import { DropDown } from "./DropDown";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export const WeatherView = ({ current, daily, hourly }: WeatherViewProps) => {
  const [weatherCurrent, setWeatherCurrent] = useState(current);
  const [weatherDaily, setWeatherDaily] = useState(daily);
  const [weatherHourly, setWeatherHourly] = useState(hourly);
  const [units, setUnits] = useState<UnitsState>({
    temperature: "°C",
    windspeed: "km/h",
    precipitation: "mm",
  });
  const todayKey = new Date().toISOString().split("T")[0];
  const [currentDay, setCurrentDay] = useState<string>(todayKey);
  const [showDropDown, setShowDrop] = useState<boolean>(false);
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
      console.log("Hourly Data:", hourlyData);
    });
  }, []);

  const groupedHourly = weatherHourly.reduce<Record<string, ForecastHour[]>>(
    (acc, hour) => {
      const day = hour.time.slice(0, 10);
      if (!acc[day]) acc[day] = [];
      acc[day].push(hour);
      return acc;
    },
    {}
  );

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const dayOptions: DayOptions[] = Object.keys(groupedHourly)
    .filter((date) => {
      const d = new Date(date);
      return d >= today && d <= nextWeek;
    })
    .map((date) => {
      const d = new Date(date);
      return {
        date,
        label: d.toLocaleDateString("en-US", { weekday: "long" }),
      };
    });

  const toggleDropDown = () => {
    setShowDrop((prev) => !prev);
  };

  const updateCurrentDay = useCallback((newDay: string) => {
    setCurrentDay(newDay);
    toggleDropDown();
  }, []);
  const metricCards: MetricCardProps[] = [
    {
      label: "Temperature",
      value: `${formatTemp(weatherCurrent.temp, units.temperature)}${
        units.temperature
      }`,
    },
    {
      label: "Wind",
      value: `${formatWind(weatherCurrent.windspeed!, units.windspeed)} ${
        units.windspeed
      }`,
    },
    {
      label: "Precipitation",
      value: `${formatPrecip(
        weatherCurrent.precipitation!,
        units.precipitation
      )} ${units.precipitation}`,
    },
    { label: "Humidity", value: `${weatherCurrent.humidity ?? 0}%` },
  ];
  return (
    <section className="w-full center flex-col!">
      <div className="w-full max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-8 px-4 md:px-6">
        <div className="w-full lg:col-span-2">
          <WeatherOverviewCard data={weatherCurrent} />
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {metricCards.map((metric) => (
              <MetricCard key={metric.label} data={metric} />
            ))}
          </div>
          <div className="w-full mt-10">
            <h3 className="text-xl text-[var(--text-primary)]">
              Daily Forecast
            </h3>
            <div className="w-full mt-5 grid grid-cols-3 md:grid-cols-7 gap-4">
              {weatherDaily.map((day) => (
                <DailyForecastCard key={day.date} data={day} />
              ))}
            </div>
          </div>
        </div>

        <article className="glass w-full p-6 max-h-[693px] overflow-auto">
          <header className="w-full flex items-center justify-between">
            <h3>Hourly forecast</h3>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropDown}
                className="center gap-1.5 px-4 py-2 rounded-lg text-[var(--neutral-0)] bg-[var(--primary)]"
              >
                {formatDayOfWeek(currentDay, "long")}
                <span>
                  {showDropDown ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </span>
              </button>
              {showDropDown && (
                <DropDown
                  data={dayOptions}
                  onUpdate={updateCurrentDay}
                  currentDay={currentDay}
                />
              )}
            </div>
          </header>
          <ul className="w-full flex flex-col gap-4 mt-4 h-[693px]">
            {groupedHourly[currentDay]?.map((hour) => (
              <HourlyForecastCard key={hour.time} data={hour} units={units} />
            ))}
          </ul>
        </article>
      </div>
      <article className="center bg-[var(--glass-inset)] w-full flex-col! mt-8 min-h-50 px-4 md:px-6">
        <div className="max-w-screen-xl w-full">
          <header className="text-center">
            <h3 className="text-4xl font-bold">AI-Powered Insights</h3>
          </header>
        </div>
      </article>
    </section>
  );
};
