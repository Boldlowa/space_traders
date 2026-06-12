import axios from "axios";

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

export const getAgentInfo = async () => {
  const res = await API.get("/my/agent");
  return res.data;
};

export const getSystemInfo = async (systemSymbol) => {
  const res = await API.get(`/systems`);
  return res.data;
};
