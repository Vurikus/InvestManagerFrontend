import {ReportHeaderName} from './reportHeaderName';
import {Abbreviation, CurrencyInfo} from './currencyInfo';
import {ExchangeService} from '../service/exchange.service';

export abstract class Report {
  id: number;
  date: Date;
  protected currencyInfo: CurrencyInfo = {currency: ExchangeService.defaultCurrency(), abbreviation: Abbreviation.TS};
  abstract getValueByHeaderName(headerName: string): number | string | Date;
  abstract getHeaders(): ReportHeaderName[];
  abstract setValueByHeaderName(headerName: string, value: any): void;
  abstract setCurrency(value: CurrencyInfo): void;

  public convertMoneyValueToDisplayString(value: number): string {
    if (value === undefined || isNaN(value) || value === null) {
      return '-';
    }
    return value >= 0 ? `${Math.round(value * 100) / 100} ${this.currencyInfo.abbreviation} ${this.currencyInfo.currency.shortDisplayName}` :
      `(${Math.round(value * 100) / 100}) ${this.currencyInfo.abbreviation} ${this.currencyInfo.currency.shortDisplayName}`;
  }


}
