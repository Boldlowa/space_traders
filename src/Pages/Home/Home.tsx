import React, { useEffect, useState } from "react";
import {
  getAgentInfo,
  getAllSystems,
  SystemItem,
  SystemsMeta,
} from "../../Api";
import "./Home.css";

type Agent = {
  symbol: string;
  credits: number;
};

function Home() {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [systems, setSystems] = useState<SystemItem[]>([]);
  const [systemsMeta, setSystemsMeta] = useState<SystemsMeta | null>(null);
  const [isSystemsLoading, setIsSystemsLoading] = useState(false);
  const [systemsError, setSystemsError] = useState("");

  useEffect(() => {
    const loadAgent = async () => {
      const data = await getAgentInfo();
      setAgent(data.data);
    };

    loadAgent();
  }, []);

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

  return (
    <section className="home-page">
      {agent ? (
        <p className="home-agent">
          Bienvenue, {agent.symbol} - Credits: {agent.credits}
        </p>
      ) : (
        <p className="home-agent">Chargement de l'agent...</p>
      )}

      <button
        type="button"
        className="home-load-button"
        onClick={loadSystems}
        disabled={isSystemsLoading}
      >
        {isSystemsLoading ? "Chargement..." : "Charger les systemes"}
      </button>

      {systemsError ? <p className="home-error">{systemsError}</p> : null}

      {systemsMeta ? (
        <p className="home-meta">
          Total API: {systemsMeta.total} | Page: {systemsMeta.page} | Limite:{" "}
          {systemsMeta.limit}
        </p>
      ) : null}

      <ul className="home-list">
        {systems.map((system) => (
          <li key={system.id} className="home-item">
            <strong>{system.name}</strong> ({system.symbol}) - {system.type} -
            Waypoints: {system.waypointCount} - Orbitals: {system.orbitalCount}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
