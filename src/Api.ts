import axios from "axios";
import type {
  AgentResult,
  RawSystem,
  SystemItem,
  SystemsMeta,
  SystemsResult,
  Waypoint,
  Location
} from "./Schema/systemSchema";

export type { SystemItem, SystemsMeta } from "./Schema/systemSchema";
const AGENT_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQk9MRExPV0FfRklSU1QiLCJ2ZXJzaW9uIjoidjIuMy4wIiwicmVzZXRfZGF0ZSI6IjIwMjYtMDYtMTQiLCJpYXQiOjE3ODE0NTU0NDgsInN1YiI6ImFnZW50LXRva2VuIn0.StQAwxmSl_XHtaGIGiu26j_mvSeC0FMaxst7JcIj9Iae20Eea6Ezf1Xz6IOdr3hmf3XRV8V4tHOASnwlSGxKRMwQ4ZUvxXw21H0Nf9QFpocjnQgXzihOzD-9BX1Zr7GJTL7_fbfsrvwFWig7V3nr4TQUSmonS_9ChZnmrlpsK2GDJk-C4P_PJSkYBjotKXuhd77_I1-LQLdN7Q6i48nbwwWIPIaePMCqK_ZSjtX6_qEUD3YDTHpFCYcPhG9zQqwu_S6ChTb1CUJ0Yh3r3Bu0e9P1duxgOnwcsbwRW1HSEN-h9yya5YibPEh4c__aKSWbZ2qY728i6qXSwMTmsg7rgX_6qJ8YRbFd-OH4yPHbDACjhcZFE_siMh6ZBWx7peyFNLIADwiePagShuV6pL8EeEzQELMY3F9YDKWl_wmsrRHBo57bOuHcIeJZOHeedfQLfK95zglDzgVwNdlNLI0Vm-85eTjb1HTrzg3ysDwrd9YWXLKV5FiGvrP6SAXugGNljwL5bPM8fjRNK2Knh4T8KuMLMgWjiYr-8mBCfITDZZ2RGKH7fJzl8HAMa15eZOVqHinYoJrASJ5KIHfRIw2KR1dGwb245ox7MrL4Y6q1bxA2gZ_gR-wv7SxcVH22p0GGtvFQb7jX6tyGF3Pi6LaS4d-enWBiilOjVA3Vz3mnM3k";

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      `Bearer ${AGENT_TOKEN}`,
  },
};

const API = axios.create({
  baseURL: "https://api.spacetraders.io/v2",
  ...options,
});

const toSystemItem = (system: RawSystem): SystemItem => {
  const waypoints = Array.isArray(system?.waypoints) ? system.waypoints : [];
  const factions = Array.isArray(system?.factions) ? system.factions : [];

  return {
    id: system.symbol,
    symbol: system.symbol,
    name: system.name ?? system.symbol,
    type: system.type,
    sectorSymbol: system.sectorSymbol,
    constellation: system.constellation ?? "Unknown",
    coordinates: {
      x: system.x,
      y: system.y,
    },
    waypointCount: waypoints.length,
    orbitalCount: waypoints.reduce((count: number, waypoint: Waypoint) => {
      const orbitals = Array.isArray(waypoint?.orbitals)
        ? waypoint.orbitals
        : [];
      return count + orbitals.length;
    }, 0),
    factionSymbols: factions
      .map((faction) => faction?.symbol)
      .filter((symbol): symbol is string => typeof symbol === "string"),
  };
};

export const getAgentInfo = async (): Promise<AgentResult> => {
  const res = await API.get<AgentResult>("/my/agent");
  return res.data;
};

export const getCurrentLocation = async (): Promise<Location> => {
  const res = await API.get<{ data: Location }>(
    "systems/X1-FR16/waypoints/X1-FR16-A1",
  );
  console.log("Fetched current location:", res.data);
  return res.data.data;
};

export const getAllSystems = async (): Promise<SystemsResult> => {
  const res = await API.get<{ data?: RawSystem[]; meta?: SystemsMeta }>(
    "/systems",
  );
  const payload = res.data;
  const systems = Array.isArray(payload?.data) ? payload.data : [];
  return {
    items: systems.map(toSystemItem),
    meta: payload?.meta ?? null,
  };
};
