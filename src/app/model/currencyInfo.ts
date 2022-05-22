export interface CurrencyInfo {
  currency: Currency;
  abbreviation: Abbreviation;
}

export interface Currency {
  name: string;
  shortDisplayName: string;
  code: string;
  rate: number;
}

export interface Abbreviation {
  code: string;
  shortDisplayName: string;
  value: number;
}
