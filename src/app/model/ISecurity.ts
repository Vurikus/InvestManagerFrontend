import {Currency, CurrencyInfo} from "./currencyInfo";
import {ExchangeService} from "../service/exchange.service";

export interface ISecurity {
  id?: number;
  exchange?: string;
  ticker?: string;
  type: SecurityType;
  name?: string;
  sector?: string;
  isin: string;
  currencyCode: string;
}

export interface ISecurityByType {
  stock: Array<ISecurity>;
  bond: Array<ISecurity>;
  etf: Array<ISecurity>;
  currency: Array<ISecurity>;
}

export class Security implements ISecurity {
  id: number;
  exchange: string;
  ticker: string;
  type = SecurityType.STOCK;
  displayType: SecurityDisplayType;
  currencyCode: string;
  currency: Currency;
  name = 'Название';
  sector = '';
  isin: string;

  constructor(s?: ISecurity, currency?: Currency) {
    if (s) {
      this.id = s.id;
      this.exchange = s.exchange;
      this.ticker = s.ticker;
      this.type = s.type;
      this.name = s.name;
      this.sector = s.sector;
      this.isin = s.isin;
    }
    this.currency = currency ? currency : ExchangeService.defaultCurrency();
    this.displayType = getSecurityDisplayTypeByType(this.type);
  }
}

export interface SecurityDisplayType {
  type: SecurityType;
  name: string;
  displayName: string;
}

function getSecurityDisplayTypeByType(s: SecurityType): SecurityDisplayType {
  switch (s) {
    case SecurityType.STOCK:
      return {name: 'STOCK', displayName: 'Акция', type: SecurityType.STOCK};
    case SecurityType.BOND:
      return {name: 'BOND', displayName: 'Облигация', type: SecurityType.BOND};
    case SecurityType.ETF:
      return {name: 'ETF', displayName: 'Фонд', type: SecurityType.ETF};
    case SecurityType.CURRENCY:
      return {name: 'CURRENCY', displayName: 'Валюта', type: SecurityType.CURRENCY};
  }
}

export enum SecurityType {
  STOCK = 'STOCK',
  ETF = 'ETF',
  BOND = 'BOND',
  CURRENCY = 'CURRENCY'
}
