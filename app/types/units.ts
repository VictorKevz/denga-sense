export type TemperatureUnit = "°C" | "°F";
export type WindUnit = "km/h" | "mph";
export type PrecipitationUnit = "Millimeters" | "inches";

export interface UnitsState {
  temperature: TemperatureUnit;
  windspeed: WindUnit;
  precipitation: PrecipitationUnit;
}
export interface MetricCardProps {
  label: string;
  value: string;
}
