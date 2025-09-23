import React from "react";
import { WeatherIcon } from "./WeatherIcon";
import { ForecastHour } from "../types/weather";
import { formatHour, formatTemp } from "../utils/formatters";
import { PulseLoader } from "react-spinners";
import { useSettings } from "../context/SettingsContext";
interface HourlyForecastProps {
  data: ForecastHour;
  loading: boolean;
}
export const HourlyForecastCard = ({ data, loading }: HourlyForecastProps) => {
  const { units, localization } = useSettings();

  return (
    <li className="glass w-full flex items-center justify-between rounded-full! px-4 h-15">
      {loading ? (
        <div className="w-full center py-4">
          <PulseLoader size={20} color="var(--accent)" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <WeatherIcon code={data.weatherCode!} />
            <time
              dateTime={data.time}
              className="text-[var(--text-primary)] text-lg"
            >
              {formatHour(data.time, localization.timeFormat)}
            </time>
          </div>
          <p className="text-base!">
            {formatTemp(data.temp, units.temperature)}
          </p>
        </>
      )}
    </li>
  );
};
