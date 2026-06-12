export interface OrbitalRef {
  symbol?: string;
}

export interface Waypoint {
  orbitals?: OrbitalRef[];
}

export interface FactionRef {
  symbol?: string;
}

export interface RawSystem {
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

export interface AgentResult {
  data: {
    symbol: string;
    credits: number;
  };
}
