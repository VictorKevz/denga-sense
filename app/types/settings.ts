export type TemperatureUnit = "Celcius" | "Fahrenheit";
export type WindUnit = "km/h" | "mph";
export type PrecipitationUnit = "Millimeters" | "Inches";

export interface UnitsState {
  temperature: TemperatureUnit;
  windspeed: WindUnit;
  precipitation: PrecipitationUnit;
}
export type UnitsKey = keyof UnitsState;
export type UnitValue = TemperatureUnit | WindUnit | PrecipitationUnit;
export interface MetricCardProps {
  label: string;
  value: string;
}
export interface SettingsContextType {
  units: UnitsState;
  onUnitUpdate: (key: UnitsKey, value: UnitValue) => void;
}
export interface ChildrenProps {
  children: React.ReactNode;
}
