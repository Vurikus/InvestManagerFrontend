export interface CurrencyInfo {
  currency: CurrencyCode;
  abbreviation: Abbreviation;
}

export interface Currency {
  name: string;
  code: string;
  value: number;
}

export enum CurrencyCode {
  RUR = 'руб.',
  USD = 'дол.',
  EUR = 'евро'
}

export enum Abbreviation {
  BLN = 'млрд.',
  MLN = 'млн.',
  TS = 'т.',
  ONE = ''
}
