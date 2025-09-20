import React, { useState } from "react";
import { EmptyPlace, Weather } from "../types/weather";
import { formatFullDate, formatHour, formatTemp } from "../utils/formatters";
import { WeatherIcon } from "./WeatherIcon";
import { PropagateLoader } from "react-spinners";
import { VideoBackground } from "./VideoBackground";
import { getBackgroundClass } from "../data/backgrounds";
import { useSettings } from "../context/SettingsContext";
import { weatherCodeMap } from "../data/weatherIcons";
import { Bookmark, BookmarkAdd, Navigation } from "@mui/icons-material";
interface WeatherOverviewCardProps {
  data: Weather;
  loading: boolean;
}
export const WeatherOverviewCard = ({
  data,
  loading,
}: WeatherOverviewCardProps) => {
  const [places, setPlaces] = useState<Weather[]>([]);

  const { units, localization } = useSettings();
  const localHour = new Date(data.time!).getHours();
  const isDay = localHour >= 6 && localHour < 18;

  const bgUrl = getBackgroundClass(data.weatherCode!, isDay);
  const info = weatherCodeMap[data.weatherCode!];
  const updatePlace = (newPlace: Weather) => {
    setPlaces((prev) => {
      const isSaved = prev.some((p: Weather) => p.id === newPlace.id);
      if (isSaved) {
        return prev.filter((p) => p.id !== newPlace.id);
      }
      return [...prev, newPlace];
    });
  };
  const isSaved = places.some((p) => p.id === data.id);
  return (
    <div className="w-full relative min-h-[17rem] center flex-col! px-6 py-8 rounded-3xl border border-[var(--glass-border)]">
      {loading && (
        <div className="w-full center">
          <PropagateLoader
            color="var(--accent)"
            size={20}
            speedMultiplier={1.5}
          />
        </div>
      )}
      <header className="w-full flex flex-col-reverse sm:flex-row items-start justify-between gap-4">
        <div className="">
          <h3 className="text-lg sm:text-2xl font-bold text-[var(--neutral-0)]">
            {data.city}, {data.country}{" "}
            <span className="">
              <Navigation fontSize="small" className="rotate-40 mb-2" />
            </span>
          </h3>
          <p className="mt-1 text-xl! text-[var(--neutral-200)]!">
            {info.label}
          </p>
        </div>
        <div className="flex flex-col sm:items-end">
          <button
            type="button"
            onClick={() => updatePlace(data)}
            className={`w-12 h-12 rounded-full! backdrop-blur-2xl! mb-4 text-[var(--neutral-0)] hover:bg-[var(--primary)]! border border-[var(--glass-border)] ${
              isSaved ? "bg-[var(--primary)]" : "glass inset"
            }`}
          >
            {isSaved ? <Bookmark className="" /> : <BookmarkAdd />}
          </button>
          <div className="flex flex-col sm:items-end">
            <time
              dateTime={data.time}
              className="text-[var(--neutral-200)] font-normal"
            >
              {formatFullDate(data.time!)}
            </time>
            <time
              dateTime={data.time}
              className="text-[var(--neutral-0)] text-lg sm:text-2xl mt-2 font-semibold"
            >
              {formatHour(data.time!, localization.timeFormat)}
            </time>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-2 mt-4 self-start">
        <div className="glass inset rounded-full!">
          <WeatherIcon code={data.weatherCode!} size={100} />
        </div>{" "}
        <span className="text-6xl sm:text-8xl text-[var(--neutral-0)] font-semibold italic">
          {formatTemp(data.temp!, units.temperature)}
        </span>
      </div>

      <VideoBackground src={bgUrl} />
    </div>
  );
};
