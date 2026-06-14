import { useEffect, useState } from "react";
import {
  getAllSystems,
  getCurrentLocation,
} from "../../Api";
import { Location, SystemItem } from "../../Schema/systemSchema";
import { useLocationContext } from "../../contexts/LocationContext";
import "./Systems.css";
import { SystemCard } from "../../Common/SystemCard";
import { CurrentLocationCard } from "../../Common/CurrentLocationCard";

function Systems() {
  const [systems, setSystems] = useState<SystemItem[]>([]);
  const [isSystemsLoading, setIsSystemsLoading] = useState(false);
  const [systemsError, setSystemsError] = useState("");
  const { currentLocation, setCurrentLocation } = useLocationContext();

  const [localCurrentLocation, setLocalCurrentLocation] = useState<Location | null>(currentLocation);

  const loadSystems = async () => {
    setIsSystemsLoading(true);
    setSystemsError("");

    try {
      const result = await getAllSystems();
      setSystems(result.items);
    } catch {
      setSystemsError("Impossible de charger les systemes");
      setSystems([]);
    } finally {
      setIsSystemsLoading(false);
    }
  };
  const getLocation = async (): Promise<void> => {
    try {
      const result = await getCurrentLocation();
      setCurrentLocation(result);
      setLocalCurrentLocation(result);
      console.log("Fetched current location:", result);
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  };
  useEffect(() => {
    loadSystems();
    getLocation();
  }, []);

  return (
    <>
    <section className="systems-page">
      {localCurrentLocation && <CurrentLocationCard location={localCurrentLocation} />}
      {isSystemsLoading ? (
        <p className="systems-loading">Chargement des systèmes...</p>
      ) : (
        <>
          {systemsError ? <p className="systems-error">{systemsError}</p> : null}

          <div className="systems-grid">
            {systems.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </>
      )}
    </section>
    </>
    
  );
}

export default Systems;
