import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Localization } from "../dashboard/settings/LocalizationManager";

export type TemperatureUnit = "Celcius" | "Fahrenheit";
export type WindUnit = "km/h" | "mph";
export type PrecipitationUnit = "Millimeters" | "Inches";

export interface SelectorOption<T = string> {
  value: T;
  label: string;
  icon?:
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string })
    | string;
}

export interface SelectorProps<T = string> {
  label: string;
  options: SelectorOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  className?: string;
}
export interface SelectorDataType {
  id: UnitsKey | AppearanceKey | LocalizationKey;
  heading: string;
  options: SelectorOption[];
}
export interface UnitsState {
  temperature: TemperatureUnit;
  windspeed: WindUnit;
  precipitation: PrecipitationUnit;
}
export const defaultUnits: UnitsState = {
  temperature: "Celcius",
  windspeed: "km/h",
  precipitation: "Millimeters",
};
export type UnitsKey = keyof UnitsState;
export type UnitValue = TemperatureUnit | WindUnit | PrecipitationUnit;
export interface MetricCardProps {
  label: string;
  value: string;
}
// Appearance types - theme, font................................
export type ThemeValues = "light" | "dark" | "system";
export type FontValues = "sans-serif" | "serif";
export type AppearanceValues = ThemeValues | FontValues;
export interface AppearanceState {
  theme: ThemeValues;
  font: FontValues;
}
export type AppearanceKey = keyof AppearanceState;

export const defaultAppearance: AppearanceState = {
  theme: "system",
  font: "sans-serif",
};
// Localization..........
export type TimeFormat = "12h" | "24h";
export type Language = "en" | "fi";

export interface LocalizationState {
  timeFormat: TimeFormat;
  language: Language;
}

export type LocalizationKey = keyof LocalizationState;
export type LocalizationValues = TimeFormat | Language;
export const defaultLocalization: LocalizationState = {
  timeFormat: "12h",
  language: "en",
};
export interface SettingsContextType {
  units: UnitsState;
  onUnitUpdate: (key: UnitsKey, value: UnitValue) => void;
  appearance: AppearanceState;
  onAppearanceUpdate: (key: AppearanceKey, value: AppearanceValues) => void;
  localization: LocalizationState;
  onLocalizationUpdate: (
    key: LocalizationKey,
    value: LocalizationValues
  ) => void;
}
export interface ChildrenProps {
  children: React.ReactNode;
}
