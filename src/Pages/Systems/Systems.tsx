import React, { useEffect, useState } from "react";
import {
  getAgentInfo,
  getAllSystems,
  SystemItem,
  SystemsMeta,
} from "../../Api";
import "./Systems.css";
import XYDataChart from "../../Common/XYDataChart";
import { SystemCard } from "../../Common/SystemCard";
type Agent = {
  symbol: string;
  credits: number;
};

function Systems() {
  const [systems, setSystems] = useState<SystemItem[]>([]);
  const [systemsMeta, setSystemsMeta] = useState<SystemsMeta | null>(null);
  const [isSystemsLoading, setIsSystemsLoading] = useState(false);
  const [systemsError, setSystemsError] = useState("");

  const loadSystems = async () => {
    setIsSystemsLoading(true);
    setSystemsError("");

    try {
      const result = await getAllSystems();
      setSystems(result.items);
      setSystemsMeta(result.meta);
    } catch {
      setSystemsError("Impossible de charger les systemes");
      setSystems([]);
      setSystemsMeta(null);
    } finally {
      setIsSystemsLoading(false);
    }
  };
  useEffect(() => {
    loadSystems();
  }, []);

  return (
    <section className="systems-page">
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
  );
}

export default Systems;
