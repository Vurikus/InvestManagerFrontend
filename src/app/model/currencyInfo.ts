export interface CurrencyInfo {
  currency: Currency;
  abbreviation: Abbreviation;
}

export enum Currency {
  RUR,
  USD,
  EUR
}

export enum Abbreviation {
  BLN = 1_000_000_000,
  MLN = 1_000_000,
  TS = 1_000,
  ONE = 1
}
