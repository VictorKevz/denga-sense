type WeatherInfo = { label: string; icon: string };

export const weatherCodeMap: Record<number, WeatherInfo> = {
  // Clear sky and mainly clear
  0: { label: "Clear sky", icon: "/icons/icon-sunny.webp" },
  1: { label: "Mainly clear", icon: "/icons/icon-sunny.webp" },

  // Partly cloudy
  2: { label: "Partly cloudy", icon: "/icons/icon-partly-cloudy.webp" },

  // Overcast
  3: { label: "Overcast", icon: "/icons/icon-overcast.webp" },

  // Fog
  45: { label: "Fog", icon: "/icons/icon-fog.webp" },
  48: { label: "Depositing rime fog", icon: "/icons/icon-fog.webp" },

  // Drizzle
  51: { label: "Drizzle: Light", icon: "/icons/icon-drizzle.webp" },
  53: { label: "Drizzle: Moderate", icon: "/icons/icon-drizzle.webp" },
  55: { label: "Drizzle: Dense", icon: "/icons/icon-drizzle.webp" },

  // Freezing Drizzle
  56: { label: "Freezing Drizzle: Light", icon: "/icons/icon-drizzle.webp" },
  57: { label: "Freezing Drizzle: Dense", icon: "/icons/icon-drizzle.webp" },

  // Rain
  61: { label: "Rain: Slight", icon: "/icons/icon-rain.webp" },
  63: { label: "Rain: Moderate", icon: "/icons/icon-rain.webp" },
  65: { label: "Rain: Heavy", icon: "/icons/icon-rain.webp" },

  // Freezing Rain
  66: { label: "Freezing Rain: Light", icon: "/icons/icon-rain.webp" },
  67: { label: "Freezing Rain: Heavy", icon: "/icons/icon-rain.webp" },

  // Snow
  71: { label: "Snow fall: Slight", icon: "/icons/icon-snow.webp" },
  73: { label: "Snow fall: Moderate", icon: "/icons/icon-snow.webp" },
  75: { label: "Snow fall: Heavy", icon: "/icons/icon-snow.webp" },
  77: { label: "Snow grains", icon: "/icons/icon-snow.webp" },

  // Rain showers
  80: { label: "Rain showers: Slight", icon: "/icons/icon-rain.webp" },
  81: { label: "Rain showers: Moderate", icon: "/icons/icon-rain.webp" },
  82: { label: "Rain showers: Violent", icon: "/icons/icon-rain.webp" },

  // Snow showers
  85: { label: "Snow showers: Slight", icon: "/icons/icon-snow.webp" },
  86: { label: "Snow showers: Heavy", icon: "/icons/icon-snow.webp" },

  // Thunderstorm
  95: {
    label: "Thunderstorm: Slight/Moderate",
    icon: "/icons/icon-storm.webp",
  },
  96: {
    label: "Thunderstorm with slight hail",
    icon: "/icons/icon-storm.webp",
  },
  99: { label: "Thunderstorm with heavy hail", icon: "/icons/icon-storm.webp" },
};
