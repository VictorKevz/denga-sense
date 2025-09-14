// WeatherOverviewCard
// A presentational (dumb) component that only renders the props it's given.
// Displays high-level weather info like city, country, date, and temperature.
// Keeps no internal state, reusable across views.

import React from "react";
import { Weather } from "../types/weather";
import { formatFullDate } from "../utils/formatters";
interface WeatherOverviewCardProps {
  data: Weather;
}
export const WeatherOverviewCard = ({ data }: WeatherOverviewCardProps) => {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat px-5 py-20 flex items-center justify-between rounded-[1.25rem]"
      style={{ backgroundImage: "url(/images/bg-today-large.svg)" }}
    >
      <div>
        <h3 className="text-2xl font-bold text-[var(--neutral-0)]">
          {data.city}, {data.country}
        </h3>
        <p className="text-[var(--neutral-0)]!">{formatFullDate(data.time!)}</p>
      </div>
      <span className="text-7xl text-[var(--neutral-0)] font-semibold italic">
        {data.temp}°
      </span>
    </div>
  );
};
