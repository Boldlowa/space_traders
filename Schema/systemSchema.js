const { type } = require("@testing-library/user-event/dist/type");

export const system = {
  symbol: { type: "string" },
  sectorSymbol: { type: "string" },
  type: { type: "string" },
  x: { type: "number" },
  y: { type: "number" },
  waypoints: [waypoint],
};
const waypoint = {
  symbol: { type: "string" },
  type: { type: "string" },
  x: { type: "number" },
  y: { type: "number" },
  orbitals: [orbital],
};

const orbital = {
  symbol: { type: "string" },
};
