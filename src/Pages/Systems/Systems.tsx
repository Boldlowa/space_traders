import React, { useEffect, useState } from "react";
import {
  getAgentInfo,
  getAllSystems,
  SystemItem,
  SystemsMeta,
} from "../../Api";
import "./Systems.css";
import XYDataChart from "../../Common/XYDataChart";
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
      {systemsError ? <p className="systems-error">{systemsError}</p> : null}

      {systemsMeta ? (
        <p className="systems-meta">
          Total API: {systemsMeta.total} | Page: {systemsMeta.page} | Limite:{" "}
          {systemsMeta.limit}
        </p>
      ) : null}

      <ul className="systems-list">
        {systems.map((system) => (
          <li key={system.id} className="systems-item">
            <strong>{system.name}</strong> ({system.symbol}) - {system.type} -
            Waypoints: {system.waypointCount} - Orbitals: {system.orbitalCount}
          </li>
        ))}
      </ul>
      <XYDataChart />
    </section>
  );
}

export default Systems;
