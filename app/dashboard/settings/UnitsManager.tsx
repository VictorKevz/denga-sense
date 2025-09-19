"use client";
import { SettingsContext, useSettings } from "@/app/context/SettingsContext";
import { UnitsKey, UnitsState, UnitValue } from "@/app/types/settings";
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
    <article className="glass center max-w-2xl w-full flex-col! gap-6 px-4 py-8">
      {unitsData.map((unit) => {
        return (
          <div key={unit.id} className="w-full">
            <h2>{unit.heading}</h2>
            <ul className="w-full center justify-between! border border-[var(--glass-border)] rounded-lg px-1 py-0.5">
              {unit.values.map((value) => {
                const isActive = units[unit.id] === value;
                return (
                  <li
                    className={`w-full center ${
                      isActive
                        ? "bg-[var(--primary)] text-[var(--neutral-0)] rounded-md"
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
