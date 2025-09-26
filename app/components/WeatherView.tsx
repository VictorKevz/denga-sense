"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DayOptions, DefaultCoords, ForecastHour } from "../types/weather";
import { WeatherOverviewCard } from "./WeatherOverviewCard";
import { MetricCard } from "./MetricCard";
import { DailyForecastCard } from "./DailyForecastCard";
import {
  formatDayOfWeek,
  formatPrecip,
  formatTemp,
  formatWind,
} from "../utils/formatters";
import { HourlyForecastCard } from "./HourlyForecastCard";
import { DropDown } from "./DropDown";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { SearchBar } from "./SearchBar";
import { useSettings } from "../context/SettingsContext";
import { useWeatherContext } from "../context/WeatherContext";
import Link from "next/link";

export interface MetricCardProps {
  label: string;
  value: string;
}

export const WeatherView = () => {
  const { weather, updateWeatherData, loading, error } = useWeatherContext();
  const { units } = useSettings();
  const { lat, long } = DefaultCoords;

  // Use the fetched location's local date if available, else fallback to browser's local date
  const locationDate = weather.current.time
    ? new Date(weather.current.time).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const [currentDay, setCurrentDay] = useState<string>(locationDate);
  const [showDropDown, setShowDrop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && weather.current.isSSR) {
      if (!navigator.geolocation) {
        updateWeatherData(lat, long);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          updateWeatherData(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          updateWeatherData(lat, long);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleDropDown = () => {
    setShowDrop((prev) => !prev);
  };

  const updateCurrentDay = useCallback((newDay: string) => {
    setCurrentDay(newDay);
    toggleDropDown();
  }, []);

  const groupedHourly = weather.hourly.reduce<Record<string, ForecastHour[]>>(
    (acc, hour) => {
      const day = hour.time.slice(0, 10);
      if (!acc[day]) acc[day] = [];
      acc[day].push(hour);
      return acc;
    },
    {}
  );

  const locationHour = weather.current.time
    ? new Date(weather.current.time).getHours()
    : new Date().getHours();
  const isToday = currentDay === locationDate;
  const hoursToDisplay =
    groupedHourly[currentDay]?.filter((hour) => {
      if (isToday) {
        return new Date(hour.time).getHours() >= locationHour;
      }
      return true;
    }) || [];

  const apiDates = Object.keys(groupedHourly);
  const dayOptions: DayOptions[] = apiDates.map((date) => {
    const d = new Date(date);
    return {
      date,
      label: d.toLocaleDateString("en-US", { weekday: "long" }),
    };
  });

  const metricCards: MetricCardProps[] = [
    {
      label: "Temperature",
      value: formatTemp(weather.current.temp, units.temperature),
    },
    {
      label: "Wind",
      value: `${formatWind(weather.current.windspeed!, units.windspeed)}`,
    },
    {
      label: "Precipitation",
      value: `${formatPrecip(
        weather.current.precipitation!,
        units.precipitation
      )}`,
    },
    { label: "Humidity", value: `${weather.current.humidity ?? 0}%` },
  ];

  const showOverflow = hoursToDisplay.length >= 7;

  if (error) {
    return (
      <div className="center flex-col! w-full min-h-[80dvh] px-6">
        <h1 className="text-4xl">An error occurred!</h1>
        <p>{error}</p>
        <Link
          href={`/`}
          className="center h-12 max-w-xs w-full border border-[var(--glass-border)] bg-[var(--primary)] text-[var(--neutral-0)] font-semibold rounded-full px-4 mt-10"
        >
          Try again
        </Link>
      </div>
    );
  }
  return (
    <section className="max-w-screen-xl w-full mx-auto center flex-col! mt-8 px-4 md:px-6 pb-[6rem]">
      <header className="text-center">
        <h1 className="text-5xl text-[var(--neutral-0)]">
          How's the sky looking today?
        </h1>
        <SearchBar onWeatherUpdate={updateWeatherData} />
      </header>
      <div className="w-full max-w-screen-xl grid lg:grid-cols-2 xl:grid-cols-3 mt-10 gap-8 ">
        {/* ............................................................................................ */}

        <div className="w-full lg:col-span-2">
          <WeatherOverviewCard
            data={weather.current}
            loading={loading}
            onWeatherUpdate={updateWeatherData}
          />
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {metricCards.map((metric) => (
              <MetricCard key={metric.label} data={metric} loading={loading} />
            ))}
          </div>
          <div className="w-full mt-10">
            <h2 className="text-xl text-[var(--text-primary)]">
              Daily Forecast
            </h2>
            <div className="w-full mt-5 grid grid-cols-3 md:grid-cols-7 gap-4">
              {weather.daily.map((day) => (
                <DailyForecastCard
                  key={day.date}
                  data={day}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ............................................................................................ */}
        <article className={`glass inset w-full px-4 py-6 h-auto  `}>
          <header className="w-full flex items-center justify-between">
            <h3 className="text-[var(--text-primary)] text-base md:text-lg font-semibold">
              Hourly forecast
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropDown}
                className="center h-11 gap-1.5 px-2 sm:px-4 rounded-full text-[var(--neutral-0)] bg-[var(--primary)] border border-[var(--glass-border)]"
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
          <ul
            className={`scrollbar-thin w-full flex flex-col gap-4 mt-4 ${
              showOverflow
                ? "overflow-y-auto h-[35.25rem]"
                : "overflow-hidden h-full"
            }`}
          >
            {hoursToDisplay?.map((hour) => (
              <HourlyForecastCard
                key={hour.time}
                data={hour}
                loading={loading}
              />
            ))}
          </ul>
        </article>
        {/* ............................................................................................ */}
      </div>
    </section>
  );
};
