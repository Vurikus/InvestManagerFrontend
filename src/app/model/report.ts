import {ReportHeaderName} from './reportHeaderName';
import {CurrencyInfo} from './currencyInfo';

export abstract class Report {
  id: number;
  date: Date;
  currencyInfo: CurrencyInfo;
  abstract getValueByHeaderName(headerName: string): number | string | Date;
  abstract getHeaders(): ReportHeaderName[];
  abstract setValueByHeaderName(headerName: string, value: any): void;
  abstract setCurrency(value: CurrencyInfo, factor: number): void;

  public convertMoneyValueToDisplayString(value: number): string {
    if (value === undefined) {
      return '-';
    }
    return value >= 0 ? `${value} ${this.currencyInfo.abbreviation} ${this.currencyInfo.currency}` :
      `(${value}) ${this.currencyInfo.abbreviation} ${this.currencyInfo.currency}`;
  }


}
