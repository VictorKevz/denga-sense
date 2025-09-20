"use client";
import { useSettings } from "@/app/context/SettingsContext";
import { UnitsKey, UnitValue } from "@/app/types/settings";
import React from "react";

export const UnitsManager = () => {
  const { units, onUnitUpdate } = useSettings();

  interface UnitsDataType {
    id: UnitsKey;
    heading: string;
    values: UnitValue[];
  }
  const unitsData: UnitsDataType[] = [
    {
      id: "temperature",
      heading: "Temperature",
      values: ["Celcius", "Fahrenheit"],
    },
    {
      id: "windspeed",
      heading: "Wind Speed",
      values: ["km/h", "mph"],
    },
    {
      id: "precipitation",
      heading: "Precipitation",
      values: ["Millimeters", "Inches"],
    },
  ];
  return (
    <article className="glass flex w-full h-full flex-col! justify-between gap-4 px-4 pt-5 pb-8">
      {unitsData.map((unit) => {
        return (
          <div key={unit.id} className="w-full">
            <h3 className="text-[var(--text-secondary)] text-xl my-1.5">
              {unit.heading}
            </h3>
            <ul className="w-full center justify-between! border border-[var(--glass-border)] rounded-full px-0.5 py-0.5">
              {unit.values.map((value) => {
                const isActive = units[unit.id] === value;
                return (
                  <li
                    key={value}
                    className={`w-full center ${
                      isActive
                        ? "bg-[var(--primary)] text-[var(--neutral-0)] rounded-full"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => onUnitUpdate(unit.id, value)}
                      className="w-full h-full py-1.5"
                    >
                      {value}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </article>
  );
};
