export interface CurrencyInfo {
  currency: Currency;
  abbreviation: Abbreviation1;
}

export interface Currency {
  name: string;
  shortDisplayName: string;
  code: string;
  rate: number;
}

export interface Abbreviation1 {
  code: string;
  shortDisplayName: string;
  value: number;
}

// export enum CurrencyCode {
//   RUR = 'руб.',
//   USD = 'дол.',
//   EUR = 'евро'
// }

// export enum Abbreviation {
//   BLN = 'млрд.',
//   MLN = 'млн.',
//   TSD = 'т.',
//   ONE = ''
// }
