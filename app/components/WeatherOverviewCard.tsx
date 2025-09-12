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
    <div
      className="w-full bg-cover bg-center bg-no-repeat px-5 h-[18rem] flex items-center justify-between rounded-[1.25rem]"
      style={{ backgroundImage: "url(/images/bg-today-large.svg)" }}
    >
      <div>
        <h3>
          {data.city}, {data.country}
        </h3>
        <p>{data.time}</p>
      </div>
      <p>{data.temp}°</p>
    </div>
  );
};
