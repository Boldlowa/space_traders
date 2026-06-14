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

  useEffect(() => {
    const loadAgent = async () => {
      const data = await getAgentInfo();
      setAgent(data.data);
    };

    loadAgent();
  }, []);

  return (
    <section className="home-page">
      {agent ? (
        <p className="home-agent">
          Bienvenue, {agent.symbol} - Credits: {agent.credits}
        </p>
      ) : (
        <p className="home-agent">Chargement de l'agent...</p>
      )}

      
    </section>
  );
}

export default Home;
