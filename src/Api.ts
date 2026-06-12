import axios from "axios";

interface OrbitalRef {
  symbol?: string;
}

interface Waypoint {
  orbitals?: OrbitalRef[];
}

interface FactionRef {
  symbol?: string;
}

interface RawSystem {
  symbol: string;
  name?: string;
  type: string;
  sectorSymbol: string;
  constellation?: string;
  x: number;
  y: number;
  waypoints?: Waypoint[];
  factions?: FactionRef[];
}

export interface SystemItem {
  id: string;
  symbol: string;
  name: string;
  type: string;
  sectorSymbol: string;
  constellation: string;
  coordinates: {
    x: number;
    y: number;
  };
  waypointCount: number;
  orbitalCount: number;
  factionSymbols: string[];
}

export interface SystemsMeta {
  total: number;
  page: number;
  limit: number;
}

export interface SystemsResult {
  items: SystemItem[];
  meta: SystemsMeta | null;
}

interface AgentResult {
  data: {
    symbol: string;
    credits: number;
  };
}

const options = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiQk9MRExPV0FfRklSU1QiLCJ2ZXJzaW9uIjoidjIuMy4wIiwicmVzZXRfZGF0ZSI6IjIwMjYtMDYtMDciLCJpYXQiOjE3ODEyNjk1MjcsInN1YiI6ImFnZW50LXRva2VuIn0.oFbTYP9TSUV-dte62uKGOSHjAwPs9g5uuQUUJJx6kip_m12RSgPrGn-rwQL4nttOgLdiUW1-d8k7bgbORfZaLGFDOIuUR0bk43DJkAve71cpCutb378eFnoiSL3h9zHBB0fmSWG3xqPKc1CxKaiiNFOFZEJFQdscvAPkqONPnes4A1eE4LTVb3WAktDgzm1cckrn-0vIDeGrMadlfxAOMoSGhiM2P6tsyrXKMrKNJj99FriQfHRI_X_z5SLS_vYNyOg7kVOS4IbYcpYSpOs7Tk3kqz7yMQBZvhe2uMM6pfYpxWsxWl4LRGRWPHez6CbPSgjQejEF_pv5WDT882TdezvKJy4CpKEtPQmz4GwjetmpBJWAjwoRS-dTIFuN92rJ7ICNBWKeEGWwyKc3Nmfpj8U6EMUIT7Uxz760ns41-jMVJI0WzaV4oYelm177NO5DRClh7DlIK2RDnpIpu3jRTG68bWUhXjJxTENGVuYf5plWDwnVDCJ-qVKfxTw7U256M-2GW-ZJyTrMjb5O3U_6Se7LDC-iDBMHNO_GSTuGERFgcwhnFUioZmYlqXYK-aTiXuDsAxQ9-DZ0lBScCyH9fatsA4QAPe-LjbhxuzKaXYwZ4IqSJrVNH-qZ5Za0_FVlenJ8_1Ukqz_zvX2hmGIuigLqxPCQ19eKjR3M--06Ygk",
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
