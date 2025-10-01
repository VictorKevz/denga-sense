"use client";
import React, { useCallback, useState } from "react";
import { DayOptions, ForecastHour } from "../types/weather";
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
import { LoadingGrid } from "./ui/LoadingGrid";
import { PropagateLoader } from "react-spinners";
import { ErroUI } from "./ui/ErroUI";

export interface MetricCardProps {
  label: string;
  value: string;
}

export const WeatherView = () => {
  const { weather, updateWeatherData, loading, error } = useWeatherContext();
  const { units } = useSettings();

  // Use the fetched location's local date if available, else fallback to browser's local date
  const locationDate = weather.current.time
    ? new Date(weather.current.time).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  const [currentDay, setCurrentDay] = useState<string>(locationDate);
  const [showDropDown, setShowDrop] = useState<boolean>(false);

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
    return <ErroUI error={error} action="goHome" />;
  }
  return (
    <main
      className="max-w-screen-2xl w-full mx-auto center flex-col! mt-8 px-4 md:px-6 pb-[6rem]"
      role="main"
    >
      <header className="text-center">
        <h1 className="text-5xl text-[var(--neutral-0)]">
          How's the sky looking today?
        </h1>
        <SearchBar onWeatherUpdate={updateWeatherData} />
      </header>
      <section className="w-full grid lg:grid-cols-2 xl:grid-cols-3 mt-10 gap-8 ">
        {/* ............................................................................................ */}

        <section
          className="w-full lg:col-span-2"
          aria-labelledby="weather-summary-heading"
        >
          {loading ? (
            <LoadingGrid className="mx-auto mt-8" length={1}>
              <PropagateLoader
                color="var(--accent)"
                size={20}
                speedMultiplier={1.5}
              />
            </LoadingGrid>
          ) : (
            <WeatherOverviewCard
              data={weather.current}
              onWeatherUpdate={updateWeatherData}
            />
          )}

          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {metricCards.map((metric) => (
              <MetricCard key={metric.label} data={metric} loading={loading} />
            ))}
          </div>
          <div className="w-full mt-10">
            <h2
              id="weather-summary-heading"
              className="text-xl text-[var(--text-primary)]"
            >
              Daily Forecast
            </h2>
            {loading ? (
              <LoadingGrid
                length={7}
                className="w-full mt-5 grid grid-cols-3 md:grid-cols-7 gap-4"
                loaderClassName="glass inset w-full min-h-[8rem] px-2.5 py-4 flex flex-col items-center justify-between last:col-span-3 md:last:col-span-1"
              />
            ) : (
              <div className="w-full mt-5 grid grid-cols-3 md:grid-cols-7 gap-4">
                {weather.daily.map((day) => (
                  <DailyForecastCard key={day.date} data={day} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ............................................................................................ */}
        <section
          className="glass inset w-full px-4 py-6 h-auto"
          aria-labelledby="hourly-forecast-heading"
        >
          <header className="w-full flex items-center justify-between">
            <h2
              id="hourly-forecast-heading"
              className="text-[var(--text-primary)] text-base md:text-lg font-semibold"
            >
              Hourly forecast
            </h2>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropDown}
                className="center h-11 gap-1.5 px-2 sm:px-4 rounded-full text-[var(--neutral-0)] bg-[var(--primary)] border border-[var(--glass-border)]"
                aria-haspopup="listbox"
                aria-expanded={showDropDown}
                aria-controls="day-options-list"
                aria-label={`Select day, ${formatDayOfWeek(
                  currentDay,
                  "long"
                )}`}
              >
                {formatDayOfWeek(currentDay, "long")}
                <span aria-hidden="true">
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
        </section>
      </section>
    </main>
  );
};
