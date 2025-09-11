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
  windspeed?: number;
  precipitation?: number;
  weatherCode?: number;
}

// AI insights / suggestions => I will later decide on the specifics...
export interface AIInsight {
  type: "summary" | "clothes" | "activity";
  text: string;
}

export type WeatherViewProps = {
  current: Weather;
  daily: ForecastDay[];
  hourly: ForecastHour[];
};
