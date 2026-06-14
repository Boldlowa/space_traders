export interface shipyard {
  symbol: string;
  shipTypes: ShipyardShip[];
  modificationsFee: number;
}

export interface ShipyardShip {
  type: string;
  name?: string;
  description?: string;
  purchasePrice?: number;
  frame?: { symbol: string };
  reactor?: { symbol: string };
  engine?: { symbol: string };
}

// Fleet - Ship definitions
export interface FleetResponse {
  data: Ship[];
  meta: FleetMeta;
}

export interface FleetMeta {
  total: number;
  page: number;
  limit: number;
}

export interface Ship {
  symbol: string;
  registration: Registration;
  nav: Navigation;
  crew: Crew;
  frame: Frame;
  reactor: Reactor;
  engine: Engine;
  modules: ShipModule[];
  mounts: ShipMount[];
  cargo: Cargo;
  fuel: Fuel;
  cooldown: Cooldown;
}

export interface Registration {
  name: string;
  factionSymbol: string;
  role: string;
}

export interface Navigation {
  systemSymbol: string;
  waypointSymbol: string;
  route: Route;
  status: string;
  flightMode: string;
}

export interface Route {
  destination: Waypoint;
  origin: Waypoint;
  departureTime: string;
  arrival: string;
}

export interface Waypoint {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

export interface Crew {
  current: number;
  required: number;
  capacity: number;
  rotation: string;
  morale: number;
  wages: number;
}

export interface Frame {
  symbol: string;
  name: string;
  condition: number;
  integrity: number;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: Requirements;
  quality: number;
}

export interface Reactor {
  symbol: string;
  name: string;
  condition: number;
  integrity: number;
  description: string;
  powerOutput: number;
  requirements: Requirements;
  quality: number;
}

export interface Engine {
  symbol: string;
  name: string;
  condition: number;
  integrity: number;
  description: string;
  speed: number;
  requirements: Requirements;
  quality: number;
}

export interface Requirements {
  power?: number;
  crew?: number;
  slots?: number;
}

export interface ShipModule {
  symbol: string;
  name: string;
  description: string;
  requirements: Requirements;
  capacity?: number;
}

export interface ShipMount {
  symbol: string;
  name: string;
  description: string;
  requirements: Requirements;
  strength?: number;
  deposits?: string[];
}

export interface Cargo {
  capacity: number;
  units: number;
  inventory: CargoItem[];
}

export interface CargoItem {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

export interface Fuel {
  current: number;
  capacity: number;
  consumed: FuelConsumed;
}

export interface FuelConsumed {
  amount: number;
  timestamp: string;
}

export interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
}

export interface ShipItem {
  symbol: string;
  type: string;
  cargoUnits: number;
  cargoCapacity: number;
  location: string;
}