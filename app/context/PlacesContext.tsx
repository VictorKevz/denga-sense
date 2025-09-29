"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { PlaceResult, Weather } from "../types/weather";
import { loadFromStorage } from "./SettingsContext";

export interface PlacesContextType {
  places: Weather[];
  togglePlace: (place: Weather) => void;
  refreshPlace: (place: Weather) => void;
  isSaved: (id: string) => boolean;
  searchHistory: PlaceResult[];
  onHistoryUpdate: (newSearch: PlaceResult) => void;
}

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesProvider = ({ children }: { children: React.ReactNode }) => {
  // This state holds all places saved
  const [places, setPlaces] = useState<Weather[]>(() =>
    loadFromStorage<Weather[]>("places", [])
  );

  const [searchHistory, setSearchHistory] = useState<PlaceResult[]>(() =>
    loadFromStorage<PlaceResult[]>("searchHistory", [])
  );

  const togglePlace = useCallback((place: Weather) => {
    setPlaces((prev) => {
      const exists = prev.some((p) => p.id === place.id);
      if (exists) return prev.filter((p) => p.id !== place.id);
      return [...prev, place];
    });
  }, []);

  const updateSearchHistory = useCallback((newSearch: PlaceResult) => {
    setSearchHistory((prev) => {
      const exists = prev.some((p) => p.id === newSearch.id);
      if (exists) return prev;
      return [...prev, newSearch];
    });
  }, []);

  const refreshPlace = useCallback((newPlace: Weather) => {
    setPlaces((prev) => prev.map((p) => (p.id === newPlace.id ? newPlace : p)));
  }, []);

  const isSaved = useCallback(
    (id: string) => {
      return places.some((p) => p.id === id);
    },
    [places]
  );
  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);
  return (
    <PlacesContext.Provider
      value={{
        places,
        togglePlace,
        refreshPlace,
        isSaved,
        searchHistory,
        onHistoryUpdate: updateSearchHistory,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlaces = () => {
  const context = useContext(PlacesContext);
  if (!context)
    throw new Error("usePlaces must be used within PlacesProvider!");
  return context;
};
