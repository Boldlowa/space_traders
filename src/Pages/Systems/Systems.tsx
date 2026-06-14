import { useEffect, useState } from "react";
import {
  getAllSystems,
  getCurrentLocation,

} from "../../Api";
import { Location,SystemItem} from "../../Schema/systemSchema";
import "./Systems.css";
import { SystemCard } from "../../Common/SystemCard";
import { CurrentLocationCard } from "../../Common/CurrentLocationCard";
type Agent = {
  symbol: string;
  credits: number;
};

function Systems() {
  const [systems, setSystems] = useState<SystemItem[]>([]);
  const [isSystemsLoading, setIsSystemsLoading] = useState(false);
  const [systemsError, setSystemsError] = useState("");
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

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
  const getLocation = async () : Promise<void> =>{
    try {
      const result = await getCurrentLocation();
      setCurrentLocation(result);
      console.log("Fetched current location:", result);
    } catch (error) {
      console.error("Error fetching current location:", error);
    }
  }
  useEffect(() => {
    loadSystems();
    getLocation();
  }, []);

  return (
    <>
    <section className="systems-page">
      {currentLocation && <CurrentLocationCard location={currentLocation} />}
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
