// Current weather for a location
export interface Weather {
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
