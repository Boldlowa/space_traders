// JSON schema for SpaceTraders systems payload.
// This schema matches: { data: [ { system... } ] }

const orbitalSchema = {
	type: "object",
	additionalProperties: false,
	required: ["symbol"],
	properties: {
		symbol: { type: "string", minLength: 1 },
	},
};

const waypointSchema = {
	type: "object",
	additionalProperties: true,
	required: ["symbol", "type", "x", "y", "orbitals"],
	properties: {
		symbol: { type: "string", minLength: 1 },
		type: { type: "string", minLength: 1 },
		x: { type: "integer" },
		y: { type: "integer" },
		orbitals: {
			type: "array",
			items: orbitalSchema,
		},
	},
};

const systemSchema = {
	type: "object",
	additionalProperties: true,
	required: ["symbol", "sectorSymbol", "type", "x", "y", "waypoints"],
	properties: {
		symbol: { type: "string", minLength: 1 },
		sectorSymbol: { type: "string", minLength: 1 },
		type: { type: "string", minLength: 1 },
		x: { type: "integer" },
		y: { type: "integer" },
		waypoints: {
			type: "array",
			items: waypointSchema,
		},
	},
};

export const systemsResponseSchema = {
	type: "object",
	additionalProperties: true,
	required: ["data"],
	properties: {
		data: {
			type: "array",
			items: systemSchema,
		},
	},
};

export { orbitalSchema, waypointSchema, systemSchema };

export default systemsResponseSchema;
