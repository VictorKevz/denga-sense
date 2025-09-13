import React from "react";
import { WeatherIcon } from "./WeatherIcon";

export const HourlyForecastCard = () => {
  return <div>HourlyForecastCard</div>;
};

export const HourlyForecastItem = () => {
  return (
    <div className="card flex items-center justify-between bg-[var(--neutral-50)]!">
      <div>
        <WeatherIcon code={1} />
        <p>3 PM</p>
      </div>
      <p>20</p>
    </div>
  );
};
