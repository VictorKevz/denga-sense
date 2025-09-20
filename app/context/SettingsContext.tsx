"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AppearanceKey,
  AppearanceState,
  AppearanceValues,
  ChildrenProps,
  defaultAppearance,
  defaultLocalization,
  defaultUnits,
  LocalizationState,
  SettingsContextType,
  TimeFormat,
  UnitsKey,
  UnitsState,
  UnitValue,
} from "../types/settings";
import { useTheme } from "next-themes";

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}
export const SettingsProvider = ({ children }: ChildrenProps) => {
  const { setTheme } = useTheme();

  const [units, setUnits] = useState<UnitsState>(() =>
    loadFromStorage<UnitsState>("units", defaultUnits)
  );

  const [appearance, setAppearance] = useState<AppearanceState>(() =>
    loadFromStorage<AppearanceState>("appearance", defaultAppearance)
  );
  const [localization, setLocalization] = useState<LocalizationState>(() => {
    return loadFromStorage("localization", defaultLocalization);
  });
  const updateUnits = useCallback((key: UnitsKey, value: UnitValue) => {
    setUnits((prev) => {
      return { ...prev, [key]: value };
    });
  }, []);

  const updateAppearance = useCallback(
    (key: AppearanceKey, value: AppearanceValues) => {
      if (key === "theme") {
        setTheme(value);
        setAppearance((prev) => ({
          ...prev,
          theme: value as AppearanceState["theme"],
        }));
        return;
      }

      setAppearance((prev) => {
        if (key === "font") {
          return { ...prev, font: value as AppearanceState["font"] };
        }
        return prev;
      });
    },
    [setTheme]
  );
  const updateLocalization = useCallback(
    (key: keyof LocalizationState, value: TimeFormat) => {
      setLocalization((prev) => {
        return { ...prev, [key]: value };
      });
    },
    []
  );
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("font-sans-custom", "font-serif-custom");

    appearance.font === "serif"
      ? html.classList.add("font-serif-custom")
      : html.classList.add("font-sans-custom");
  }, [appearance.font]);

  useEffect(() => {
    localStorage.setItem("units", JSON.stringify(units));
    localStorage.setItem("appearance", JSON.stringify(appearance));
    localStorage.setItem("localization", JSON.stringify(localization));
  }, [units, appearance, localization]);
  return (
    <SettingsContext.Provider
      value={{
        units,
        onUnitUpdate: updateUnits,
        appearance,
        onAppearanceUpdate: updateAppearance,
        localization,
        onLocalizationUpdate: updateLocalization,
      }}
    >
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
