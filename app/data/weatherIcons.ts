type WeatherInfo = { label: string; icon: string };

export const weatherCodeMap: Record<number, WeatherInfo> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫" },
  48: { label: "Depositing rime fog", icon: "🌫" },

  51: { label: "Drizzle: Light", icon: "🌦" },
  53: { label: "Drizzle: Moderate", icon: "🌦" },
  55: { label: "Drizzle: Dense", icon: "🌧" },

  56: { label: "Freezing Drizzle: Light", icon: "🌨" },
  57: { label: "Freezing Drizzle: Dense", icon: "🌨" },

  61: { label: "Rain: Slight", icon: "🌧" },
  63: { label: "Rain: Moderate", icon: "🌧" },
  65: { label: "Rain: Heavy", icon: "🌧" },

  66: { label: "Freezing Rain: Light", icon: "🌨" },
  67: { label: "Freezing Rain: Heavy", icon: "🌨" },

  71: { label: "Snow fall: Slight", icon: "❄️" },
  73: { label: "Snow fall: Moderate", icon: "❄️" },
  75: { label: "Snow fall: Heavy", icon: "❄️" },

  77: { label: "Snow grains", icon: "❄️" },

  80: { label: "Rain showers: Slight", icon: "🌦" },
  81: { label: "Rain showers: Moderate", icon: "🌧" },
  82: { label: "Rain showers: Violent", icon: "🌧" },

  85: { label: "Snow showers: Slight", icon: "🌨" },
  86: { label: "Snow showers: Heavy", icon: "❄️" },

  95: { label: "Thunderstorm: Slight/Moderate", icon: "⛈" },
  96: { label: "Thunderstorm with slight hail", icon: "⛈" },
  99: { label: "Thunderstorm with heavy hail", icon: "⛈" },
};
