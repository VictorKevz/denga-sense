import React, { useEffect, useState } from "react";
import { searchPlace } from "../lib/weather";
import { PlaceResult } from "../types/weather";
import { PulseLoader } from "react-spinners";
import { Error, KeyboardArrowRight, Search } from "@mui/icons-material";
import { usePlaces } from "../context/PlacesContext";

type FormProps = {
  onWeatherUpdate: (lat: number, long: number) => Promise<void>;
};
export const SearchBar = ({ onWeatherUpdate }: FormProps) => {
  const [query, setQuery] = useState("");
  const [placeResults, setPlaceResults] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");
  const { onHistoryUpdate } = usePlaces();
  useEffect(() => {
    if (query.length < 2) {
      setPlaceResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const cities: PlaceResult[] = await searchPlace(query);
        if (cities.length === 0) {
          setError("No results found.");
        } else {
          setError("");
        }
        setPlaceResults(cities);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Something went wrong while fetching.");
        setPlaceResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const updateCoords = (city: PlaceResult) => {
    setQuery(`${city.name}, ${city.country}`);
    setSelectedPlace(city);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setInputError("");
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (!query && query.trim() === "") ||
      query.length < 2 ||
      placeResults.length === 0
    ) {
      setInputError("Please enter a valid place");
      return;
    }
    if (selectedPlace) {
      onHistoryUpdate(selectedPlace);
      onWeatherUpdate(selectedPlace.latitude, selectedPlace.longitude);
    }
    setPlaceResults([]);
    setError("");
    setInputError("");
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="center relative w-full flex-col! md:flex-row! md:justify-between! gap-4 mt-12 z-10"
    >
      <label
        htmlFor="query"
        className={` center relative justify-start! w-full px-6 shadow-2xl ${
          inputError
            ? "border border-[var(--error)]! bg-[var(--error-faded)]! rounded-full!"
            : "glass rounded-full! focus-within:bg-transparent! hover:bg-transparent!"
        }`}
      >
        <Search className="mr-3" />

        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Search for a place..."
          className="h-14 w-full text-lg text-[var(--text-primary)] placeholder:text-[var(--text-primary)]"
        />
        {inputError && (
          <span className="absolute top-full mt-1 left-4 text-[var(--error)]">
            {inputError}
          </span>
        )}
      </label>

      <button
        type="submit"
        className="center w-full h-14 px-6 bg-[var(--primary)] border border-[var(--glass-border)] text-[var(--neutral-0)] md:w-fit rounded-full hover:bg-transparent"
      >
        Search
      </button>
      {query && (
        <div className="glass backdrop-blur-xl backdrop-saturate-150 backdrop-brightness-80 absolute top-full left-0 w-full rounded-3xl mt-3.5 px-5 py-6">
          {loading && (
            <PulseLoader
              color="var(--accent)"
              margin={2}
              size={25}
              speedMultiplier={1}
            />
          )}
          {error && (
            <div className="w-full text-center">
              <Error fontSize="large" className="text-red-400" />{" "}
              <p className="text-xl! my-2">{error}</p>
            </div>
          )}
          {!loading && placeResults.length > 0 && (
            <ul className="w-full flex flex-col gap-3 ">
              {placeResults.map((city) => (
                <li key={city.id} className="w-full">
                  <button
                    type="button"
                    onClick={() => updateCoords(city)}
                    className="center inset w-full justify-between! border border-[var(--glass-border)] px-3 py-1 rounded-full hover:bg-[var(--primary)] hover:text-[var(--neutral-0)]"
                  >
                    {city.name}, {city.country}{" "}
                    <span>
                      <KeyboardArrowRight />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
};
