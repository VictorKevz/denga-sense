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
import { HourlyForecastCard } from "./HourlyForecastCard";
import { DropDown } from "./DropDown";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { SearchBar } from "./SearchBar";
import { useSettings } from "../context/SettingsContext";
export interface MetricCardProps {
  label: string;
  value: string;
}
export const WeatherView = ({ current, daily, hourly }: WeatherViewProps) => {
  const [weatherCurrent, setWeatherCurrent] = useState(current);
  const [weatherDaily, setWeatherDaily] = useState(daily);
  const [weatherHourly, setWeatherHourly] = useState(hourly);

  const todayKey = new Date().toISOString().split("T")[0];
  const [currentDay, setCurrentDay] = useState<string>(todayKey);
  const [showDropDown, setShowDrop] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { units } = useSettings();
  async function updateWeatherData(latitude: number, longitude: number) {
    try {
      setLoading(true);
      setError(null);

      const [currentData, dailyData, hourlyData] = await Promise.all([
        getWeather(latitude, longitude),
        getDailyForecast(latitude, longitude),
        getHourlyForecast(latitude, longitude),
      ]);

      const geoRes = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
      );
      if (!geoRes.ok) throw new Error("Failed to fetch location details");

      const geoData = await geoRes.json();
      const city = geoData.city;
      const country = geoData.countryName;

      setWeatherCurrent({
        ...currentData,
        city,
        country,
        precipitation: hourlyData[0]?.precipitation,
        humidity: hourlyData[0]?.humidity,
        feelsLike: hourlyData[0]?.feelsLike,
      });
      setWeatherDaily(dailyData);
      setWeatherHourly(hourlyData);
    } catch (err) {
      console.error(err);
      setError("Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      updateWeatherData(latitude, longitude);
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

  const currentHour = new Date().getHours();
  const isToday = currentDay === todayKey;
  const hoursToDisplay = groupedHourly[currentDay]?.filter((hour) => {
    if (isToday) {
      return new Date(hour.time).getHours() >= currentHour;
    }
    return true;
  });

  const apiDates = Object.keys(groupedHourly);
  const dayOptions: DayOptions[] = apiDates.map((date) => {
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
      value: formatTemp(weatherCurrent.temp, units.temperature),
    },
    {
      label: "Wind",
      value: `${formatWind(weatherCurrent.windspeed!, units.windspeed)}`,
    },
    {
      label: "Precipitation",
      value: `${formatPrecip(
        weatherCurrent.precipitation!,
        units.precipitation
      )}`,
    },
    { label: "Humidity", value: `${weatherCurrent.humidity ?? 0}%` },
  ];

  const showOverflow = hoursToDisplay.length >= 7;

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
          <WeatherOverviewCard data={weatherCurrent} loading={loading} />
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
              {weatherDaily.map((day) => (
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
        <article
          className={`glass scrollbar-thin w-full px-4 py-6 h-[660px] ${
            showOverflow ? "overflow-y-auto" : ""
          }`}
        >
          <header className="w-full flex items-center justify-between">
            <h3 className="text-[var(--text-primary)] text-base md:text-xl font-semibold">
              Hourly forecast
            </h3>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropDown}
                className="center gap-1.5 px-2 sm:px-4 py-2 rounded-lg text-[var(--neutral-0)] bg-[var(--primary)]"
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
