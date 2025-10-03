import React from "react";
import { WeatherIcon } from "./WeatherIcon";
import { ForecastHour } from "../types/weather";
import { formatHour, formatTemp } from "../utils/formatters";
import { PulseLoader } from "react-spinners";
import { useSettings } from "../context/SettingsContext";
import { motion } from "framer-motion";
import { FadeInVariants } from "../variants";

interface HourlyForecastProps {
  data: ForecastHour;
  loading: boolean;
}
export const HourlyForecastCard = ({ data, loading }: HourlyForecastProps) => {
  const { units, localization } = useSettings();

  return (
    <motion.li
      className="glass w-full flex items-center justify-between rounded-full! px-4 h-15"
      variants={FadeInVariants(5, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      exit="exit"
    >
      {loading ? (
        <div className="w-full center py-4" aria-busy="true" aria-live="polite">
          <PulseLoader size={20} color="var(--accent)" />
          <span className="sr-only">Loading hourly forecast…</span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <WeatherIcon code={data.weatherCode!} aria-hidden="true" />
            <time
              dateTime={data.time}
              className="text-[var(--text-primary)] text-lg"
            >
              {formatHour(data.time, localization.timeFormat)}
            </time>
          </div>
          <p
            className="text-base!"
            aria-label={`Temperature ${formatTemp(
              data.temp,
              units.temperature
            )}`}
          >
            {formatTemp(data.temp, units.temperature)}
          </p>
        </>
      )}
    </motion.li>
  );
};
