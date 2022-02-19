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

// export enum CurrencyCode {
//   RUR = 'руб.',
//   USD = 'дол.',
//   EUR = 'евро'
// }

export enum Abbreviation {
  BLN = 'млрд.',
  MLN = 'млн.',
  TS = 'т.',
  ONE = ''
}
