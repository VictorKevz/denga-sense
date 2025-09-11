// WeatherOverviewCard
// A presentational (dumb) component that only renders the props it's given.
// Displays high-level weather info like city, country, date, and temperature.
// Keeps no internal state, reusable across views.

import React from "react";
import { Weather } from "../types/weather";
interface WeatherOverviewCardProps {
  data: Weather;
}
export const WeatherOverviewCard = ({ data }: WeatherOverviewCardProps) => {
  return (
    <div className="w-full bg-amber-500 rounded-2xl px-5 py-8 flex items-center justify-between">
      <div>
        <h3>
          {data.city}, {data.country}
        </h3>
        <p>{data.time}</p>
      </div>
      <p>{data.temp}</p>
    </div>
  );
};
