import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Location } from "../Schema/systemSchema";

type LocationContextValue = {
  currentLocation: Location | null;
  setCurrentLocation: (location: Location | null) => void;
};

const STORAGE_KEY = "spaceTraderCurrentLocation";

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(() => {
    if (typeof window === "undefined") return null;
    const persisted = window.localStorage.getItem(STORAGE_KEY);
    if (!persisted) return null;
    try {
      return JSON.parse(persisted) as Location;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentLocation) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentLocation));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentLocation]);

  const value = useMemo(
    () => ({ currentLocation, setCurrentLocation }),
    [currentLocation],
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within LocationProvider");
  }
  return context;
}
