export interface Instrument {
  id: number;
  exchange: string;
  ticker: string;
  type: SecurityType;
  name: string;
  sector: string;
}

export interface InstrumentType {
  name: string;
  displayName: string;
}

export enum SecurityType {
  STOCK = 'STOCK',
  ETF = 'ETF',
  BOND = 'BOND',
  CURRENCY = 'CURRENCY'
}
