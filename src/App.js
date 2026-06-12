import React, { useEffect, useState } from "react";
import { getAgentInfo, getAllSystems } from "./Api";

function App() {
  const [agent, setAgent] = useState(null);
  const [systems, setSystems] = useState([]);
  const [systemsMeta, setSystemsMeta] = useState(null);
  const [isSystemsLoading, setIsSystemsLoading] = useState(false);
  const [systemsError, setSystemsError] = useState("");

  useEffect(() => {
    getAgentInfo().then((data) => setAgent(data.data));
  }, []);

  const loadSystems = async () => {
    setIsSystemsLoading(true);
    setSystemsError("");

    try {
      const result = await getAllSystems();
      setSystems(result.items);
      setSystemsMeta(result.meta);
    } catch (error) {
      setSystemsError("Impossible de charger les systemes");
      setSystems([]);
      setSystemsMeta(null);
    } finally {
      setIsSystemsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>SpaceTraders Dashboard</h1>
        {agent ? (
          <p>
            Bienvenue, {agent.symbol} — Crédits : {agent.credits}
          </p>
        ) : (
          <p>Chargement...</p>
        )}
      </div>

      <button onClick={loadSystems} disabled={isSystemsLoading}>
        Charger les systèmes
      </button>

      {systemsError ? <p>{systemsError}</p> : null}

      {systemsMeta ? (
        <p>
          Total API: {systemsMeta.total} | Page: {systemsMeta.page} | Limite:{" "}
          {systemsMeta.limit}
        </p>
      ) : null}

      <ul>
        {systems.map((system) => (
          <li key={system.id}>
            <strong>{system.name}</strong> ({system.symbol}) - {system.type} -
            Waypoints: {system.waypointCount} - Orbitals: {system.orbitalCount}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
