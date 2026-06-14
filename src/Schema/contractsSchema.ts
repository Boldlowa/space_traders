export interface Contract {
    id: string;
    factionSymbol: string;
    type: string;
    terms: termsRef;
    accepted: boolean;
    fulfilled: boolean;
    expiration: string;
    deadlineToAccept: string;
}
export interface termsRef {
    deadline: string;
    payment: paymentRef;
    deliver: deliverRef[];
}

export interface paymentRef {
    onAccepted: number;
    onFulfilled: number;
}

export interface deliverRef {
    tradeSymbol: string;
    destinationSymbol: string;
    unitsRequired: number;
    unitsFulfilled: number;
}

export interface ContractsMeta {
  total: number;
  page: number;
  limit: number;
}