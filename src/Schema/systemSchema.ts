export interface OrbitalRef {
  symbol?: string;
}

export interface TraitRef {
  symbol: string;
  name: string;
  description: string;
}

export interface chartRef {
  submittedBy: string;
  submittedOn: string;
  waypointSymbol: string;
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

export interface Location {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: OrbitalRef[];
  traits: TraitRef[];
  isUnderConstruction: boolean;
  faction: FactionRef | null;
  modifier: string[];
  chart: chartRef;
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
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
  };
}
