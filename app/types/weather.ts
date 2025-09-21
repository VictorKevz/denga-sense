export type WeatherDataResult = {
  current: Weather;
  daily: ForecastDay[];
  hourly: ForecastHour[];
};
// Current weather for a location
export interface Weather {
  id: string;
  latitude: number;
  longitude: number;
  temp: number;
  feelsLike?: number;
  windspeed?: number;
  humidity?: number;
  precipitation?: number;
  time?: string;
  city?: string;
  country?: string;
  weatherCode?: number;
}
export const EmptyPlace: Weather = {
  id: "",
  latitude: 0,
  longitude: 0,
  temp: 0,
  feelsLike: 0,
  windspeed: 0,
  humidity: 0,
  precipitation: 0,
  time: "",
  city: "",
  country: "",
  weatherCode: 0,
};
// Single day in the 7-day forecast
export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode?: number;
}

// Single hour in the hourly forecast
export interface ForecastHour {
  time: string;
  temp: number;
  feelsLike?: number;
  windspeed?: number;
  precipitation?: number;
  weatherCode?: number;
  humidity?: number;
}

export type PlaceResult = Pick<
  Weather,
  "latitude" | "longitude" | "country"
> & {
  id: number;
  name: string;
};
export type WeatherViewProps = {
  current: Weather;
  daily: ForecastDay[];
  hourly: ForecastHour[];
};
export type MetricType = {
  label: string;
  value: string;
};
export interface DayOptions {
  date: string;
  label: string;
}
