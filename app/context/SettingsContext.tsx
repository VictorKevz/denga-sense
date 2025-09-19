"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  ChildrenProps,
  SettingsContextType,
  UnitsKey,
  UnitsState,
  UnitValue,
} from "../types/settings";

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: ChildrenProps) => {
  const [units, setUnits] = useState<UnitsState>({
    temperature: "Celcius",
    windspeed: "km/h",
    precipitation: "Millimeters",
  });

  const updateUnits = useCallback((key: UnitsKey, value: UnitValue) => {
    setUnits((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  return (
    <SettingsContext.Provider value={{ units, onUnitUpdate: updateUnits }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within SettingsProvider!");
  return context;
};
