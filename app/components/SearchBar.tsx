import React, { useEffect, useState } from "react";
import { searchCities } from "../lib/weather";
import { CityResult } from "../types/weather";
import { PulseLoader } from "react-spinners";
import { Error, KeyboardArrowRight, Search } from "@mui/icons-material";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [cityResults, setCityResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.length < 2) {
      setCityResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const cities: CityResult[] = await searchCities(query);
        if (cities.length === 0) {
          setError("No results found.");
        } else {
          setError("");
        }
        setCityResults(cities);
      } catch (err) {
        console.error("Error fetching cities:", err);
        setError("Something went wrong while fetching.");
        setCityResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <form className="center relative w-full flex-col! md:flex-row! md:justify-between! gap-4 mt-12">
      <label
        htmlFor="query"
        className="glass center justify-start! w-full px-6 "
      >
        <Search className="mr-3" />

        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={handleChange}
          placeholder="Search for a place..."
          className="h-14 w-full text-lg text-[var(--text-primary)] placeholder:text-[var(--text-primary)]"
        />
      </label>

      <button
        type="submit"
        className="center h-14 px-6 bg-[var(--primary)] text-[var(--neutral-0)] md:w-fit rounded-xl"
      >
        Search
      </button>
      {query && (
        <div className="inset absolute top-full left-0 w-full bg-[var(--bg-secondary)] rounded-xl mt-3.5 px-5 py-6">
          {loading && (
            <PulseLoader
              color="var(--primary)"
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
          {!loading && cityResults.length > 0 && (
            <ul className="w-full flex flex-col gap-3">
              {cityResults.map((city) => (
                <li key={city.id} className="w-full">
                  <button
                    type="button"
                    className="center w-full justify-between! border border-[var(--border)] px-3 py-1 rounded-sm hover:border-transparent hover:bg-[var(--primary)] hover:text-[var(--neutral-0)]"
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
