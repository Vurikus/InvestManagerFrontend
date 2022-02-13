export interface CurrencyInfo {
  currency: Currency;
  abbreviation: Abbreviation;
}

export enum Currency {
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
