import {
  PrecipitationUnit,
  TemperatureUnit,
  TimeFormat,
  WindUnit,
} from "../types/settings";

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

export function formatHour(isoTime: string, timeFormat: TimeFormat): string {
  const options: Intl.DateTimeFormatOptions =
    timeFormat === "12h"
      ? { hour: "numeric", minute: "2-digit", hour12: true }
      : { hour: "2-digit", minute: "2-digit", hour12: false };

  return new Intl.DateTimeFormat("en-US", options).format(new Date(isoTime));
}

export function formatTemp(value: number, unit: TemperatureUnit) {
  const answer =
    unit === "Celcius" ? Math.round(value) : Math.round((value * 9) / 5 + 32);

  return `${answer}°`;
}

export function formatWind(value: number, unit: WindUnit) {
  const answer =
    unit === "km/h" ? Math.round(value) : Math.round(value * 0.621371);
  const currentUnit = unit === "km/h" ? "km/h" : "mph";

  return `${answer} ${currentUnit}`;
}

export function formatPrecip(value: number, unit: PrecipitationUnit) {
  const answer = unit === "Millimeters" ? value : value / 25.4;
  const currentUnit = unit === "Millimeters" ? "mm" : "in";
  return `${answer} ${currentUnit}`;
}
