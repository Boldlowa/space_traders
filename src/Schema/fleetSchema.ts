export interface shipyard {
  symbol:string;
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