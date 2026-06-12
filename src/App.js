import React, { useEffect, useState } from "react";
import { getAgentInfo, getSystemInfo } from "./Api";

function App() {
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    getAgentInfo().then((data) => setAgent(data.data));
  }, []);

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

      <button onClick={() => getSystemInfo().then((data) => console.log(data))}>
        Charger les systèmes
      </button>
    </>
  );
}

export default App;
