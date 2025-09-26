"use client";
import { useSettings } from "@/app/context/SettingsContext";
import {
  SelectorDataType,
  SelectorOption,
  UnitsKey,
  UnitValue,
} from "@/app/types/settings";
import React from "react";
import { SettingsSelector } from "./SettingsSelector";

export const UnitsManager = () => {
  const { units, onUnitUpdate } = useSettings();

  const unitsData: SelectorDataType[] = [
    {
      id: "temperature",
      heading: "Temperature",
      options: [
        { value: "Celcius", label: "Celcius (°C)" },
        { value: "Fahrenheit", label: "Fahrenheit (°F)" },
      ],
    },
    {
      id: "windspeed",
      heading: "Wind Speed",
      options: [
        { value: "km/h", label: "Kilometers (km/h)" },
        { value: "mph", label: "Miles (mph)" },
      ],
    },
    {
      id: "precipitation",
      heading: "Precipitation",
      options: [
        { value: "Millimeters", label: "Millimeters (mm)" },
        { value: "Inches", label: "Inches (in)" },
      ],
    },
  ];
  return (
    <article className="glass flex w-full h-full flex-col! justify-between gap-4 px-4 pt-5 pb-8">
      {unitsData.map((obj) => {
        return (
          <SettingsSelector
            key={obj.id}
            label={obj.heading}
            options={obj.options}
            selected={units[obj.id as UnitsKey]}
            onSelect={(value) =>
              onUnitUpdate(obj.id as UnitsKey, value as UnitValue)
            }
          />
        );
      })}
    </article>
  );
};
