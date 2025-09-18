import { PrecipitationUnit, TemperatureUnit, WindUnit } from "../types/units";

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDayOfWeek(
  dateString: string,
  format: "long" | "short" | "narrow" = "short"
): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    weekday: format,
  }).format(date);
}

export function formatHour(isoTime: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
  }).format(new Date(isoTime));
}
// export function formatTime(isoTime: string) {
//   const date = new Date(isoTime);
//   return date.toLocaleTimeString([], {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });
// }
export function formatTemp(value: number, unit: TemperatureUnit) {
  return unit === "°C" ? value : (value * 9) / 5 + 32;
}

export function formatWind(value: number, unit: WindUnit) {
  return unit === "km/h" ? value : value * 0.621371;
}

export function formatPrecip(value: number, unit: PrecipitationUnit) {
  return unit === "mm" ? value : value / 25.4;
}
