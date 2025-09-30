import { Weather } from "../types/weather";
import { formatFullDate, formatHour, formatTemp } from "../utils/formatters";
import { WeatherIcon } from "./WeatherIcon";
import { PropagateLoader } from "react-spinners";
import { VideoBackground } from "./VideoBackground";
import { getBackgroundClass } from "../data/backgrounds";
import { useSettings } from "../context/SettingsContext";
import { weatherCodeMap } from "../data/weatherIcons";
import {
  ArrowForward,
  Bookmark,
  BookmarkAdd,
  Navigation,
} from "@mui/icons-material";
import { usePlaces } from "../context/PlacesContext";
import { usePathname, useRouter } from "next/navigation";
interface WeatherOverviewCardProps {
  data: Weather;
  loading: boolean;
  onWeatherUpdate: (lat: number, lon: number) => Promise<void>;
}
export const WeatherOverviewCard = ({
  data,
  onWeatherUpdate,
}: WeatherOverviewCardProps) => {
  const { isSaved, togglePlace } = usePlaces();
  const router = useRouter();

  const { units, localization } = useSettings();
  const localHour = new Date(data.time!).getHours();
  const isDay = localHour >= 6 && localHour < 18;

  const bgUrl = getBackgroundClass(data.weatherCode!, isDay);
  const info = weatherCodeMap[data.weatherCode!];
  const pathname = usePathname();
  const isPlaces = pathname === "/dashboard/places";

  const handleViewClick = () => {
    onWeatherUpdate(data.latitude, data.longitude);
    router.push(`/dashboard/weather`);
  };
  return (
    <div
      className={`w-full relative  ${
        isPlaces ? "min-h-fit" : "min-h-[17rem]"
      } center flex-col! px-6 py-8 rounded-3xl border border-[var(--glass-border)]`}
    >
      <header className="w-full flex flex-col-reverse sm:flex-row items-start justify-between gap-4 z-5">
        <div className="">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--neutral-0)]">
            {data.city}, {data.country}{" "}
            <span className="">
              <Navigation fontSize="small" className="rotate-40 mb-2" />
            </span>
          </h3>
          <p className="mt-1 text-xl! text-[var(--neutral-200)]!">
            {info.label}
          </p>
        </div>
        <div className="flex flex-col sm:items-end min-w-max">
          <button
            type="button"
            onClick={() => togglePlace(data)}
            className={`w-12 h-12 rounded-full! backdrop-blur-2xl! mb-4 text-[var(--neutral-0)] hover:bg-[var(--primary)]! border border-[var(--glass-border)] ${
              isSaved(data.id) ? "bg-[var(--primary)]" : "glass inset"
            }`}
          >
            {isSaved(data.id) ? <Bookmark className="" /> : <BookmarkAdd />}
          </button>
          <div className="flex flex-col sm:items-end">
            <time
              dateTime={data.time}
              className="text-[var(--neutral-200)] font-normal"
            >
              {formatFullDate(data.time!)}
            </time>
            <time
              dateTime={data.time}
              className="text-[var(--neutral-0)] text-lg sm:text-2xl mt-2 font-semibold"
            >
              {formatHour(data.time!, localization.timeFormat)}
            </time>
          </div>
        </div>
      </header>
      <footer className="w-full flex justify-between items-baseline mt-4 z-5">
        <div className="flex items-center gap-2  ">
          <div className="glass inset rounded-full!">
            <WeatherIcon
              code={data.weatherCode!}
              size={Number(`${isPlaces ? 50 : 80}`)}
            />
          </div>{" "}
          <span
            className={`${
              isPlaces ? "text-4xl sm:text-6xl" : "text-6xl sm:text-8xl"
            } text-[var(--neutral-0)] font-semibold italic`}
          >
            {formatTemp(data.temp!, units.temperature)}
          </span>
        </div>
        {isPlaces && (
          <button
            type="button"
            onClick={handleViewClick}
            className="center gap-2 h-12 min-w-fit px-5 bg-[var(--primary)] border border-[var(--glass-border)] text-[var(--neutral-0)] rounded-full"
          >
            View
            <span className="center h-8 w-8 bg-[var(--neutral-0)] rounded-full text-[var(--neutral-900)]">
              <ArrowForward className="-rotate-20" />
            </span>
          </button>
        )}
      </footer>

      <VideoBackground src={bgUrl} />
    </div>
  );
};
