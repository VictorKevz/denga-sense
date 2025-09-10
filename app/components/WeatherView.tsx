import React from "react";
import { WeatherViewProps } from "../types/weather";

export const WeatherView = ({ current, daily, hourly }: WeatherViewProps) => {
  return (
    <section>
      <p>{current.temp}</p>
      <p>{current.feelsLike}</p>

      <ul>
        {daily.map((day) => (
          <li key={day.date}>
            <p>{day.date}</p>
            <span>{day.tempMax}</span>
            <span>{day.tempMin}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
