import React, { createContext, useState, useCallback, ReactNode } from "react";
import { getAgentInfo } from "./Api";

type Agent = {
  symbol: string;
  credits: number;
};

type AgentContextType = {
  agent: Agent | null;
  refreshAgent: () => Promise<void>;
};

export const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [agent, setAgent] = useState<Agent | null>(null);

  const loadAgent = useCallback(async () => {
    try {
      const data = await getAgentInfo();
      console.log("Agent info loaded:", data);
      setAgent(data.data);
    } catch (error) {
      console.error("Error loading agent info:", error);
    }
  }, []);

  const refreshAgent = useCallback(async () => {
    console.log("Refreshing agent info...");
    await loadAgent();
  }, [loadAgent]);

  React.useEffect(() => {
    loadAgent();
  }, [loadAgent]);

  return (
    <AgentContext.Provider value={{ agent, refreshAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = React.useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgent must be used within AgentProvider");
  }
  return context;
};
