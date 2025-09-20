export type TemperatureUnit = "Celcius" | "Fahrenheit";
export type WindUnit = "km/h" | "mph";
export type PrecipitationUnit = "Millimeters" | "Inches";

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
export interface SettingsContextType {
  units: UnitsState;
  onUnitUpdate: (key: UnitsKey, value: UnitValue) => void;
  appearance: AppearanceState;
  onAppearanceUpdate: (key: AppearanceKey, value: AppearanceValues) => void;
}
export interface ChildrenProps {
  children: React.ReactNode;
}
