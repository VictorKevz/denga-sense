export const weatherBackgrounds: Record<string, string> = {
  clearDay: "/videos/clearDay.mp4",
  clearNight: "/videos/clearNight.mp4",
  cloudyDay: "/videos/cloudyDay.mp4",
  cloudyNight: "/videos/cloudyNight.mp4",
  rainDay: "/videos/rainDay.mp4",
  rainNight: "/videos/rainNight.mp4",
  snowDay: "/videos/snowDay.mp4",
  snowNight: "/videos/snowNight.mp4",
  stormDay: "/videos/stormDay.mp4",
  stormNight: "/videos/stormNight.mp4",
};

// I have simply grouped the codes here to reduce the number of assets.
// You can check the API docs for a specific condition on each weather code.
export function getBackgroundClass(
  weatherCode: number,
  isDay: boolean
): string {
  // Clear sky
  if ([0, 1].includes(weatherCode))
    return isDay ? weatherBackgrounds.clearDay : weatherBackgrounds.clearNight;

  // Cloudy
  if ([2, 3, 45, 48].includes(weatherCode))
    return isDay
      ? weatherBackgrounds.cloudyDay
      : weatherBackgrounds.cloudyNight;

  // Rain / Drizzle
  if (
    [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
  )
    return isDay ? weatherBackgrounds.rainDay : weatherBackgrounds.rainNight;

  // Snow
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
    return isDay ? weatherBackgrounds.snowDay : weatherBackgrounds.snowNight;

  // Thunderstorm
  if ([95, 96, 99].includes(weatherCode))
    return isDay ? weatherBackgrounds.stormDay : weatherBackgrounds.stormNight;

  // Fallback to clear if unmatched
  return isDay ? weatherBackgrounds.clearDay : weatherBackgrounds.clearNight;
}
