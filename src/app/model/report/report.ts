import {ReportHeaderName} from './reportHeaderName';
import {ExchangeService} from '../../service/exchange.service';
import {CurrencyInfo} from '../currencyInfo';
import {ReportType} from './reportType';
import {ICompany} from '../ICompany';

export interface IReport {
  id: number;
  date: string | Date;
  type: ReportType;
  company: ICompany;
  currencyInfo: CurrencyInfo;
}

export abstract class Report implements IReport{

  protected constructor(c: ICompany, r?: IReport) {
    this.id = r?.id ?? null;
    this.date = new Date(r?.date);
    this.company = c;
    if (r && r.currencyInfo) { this.currencyInfo = r.currencyInfo; }
    else { this.currencyInfo = {currency: ExchangeService.defaultCurrency(), abbreviation: ExchangeService.defaultAbbreviation()}; }
  }
  id: number;
  date: Date;
  type: ReportType;
  company: ICompany;
  currencyInfo: CurrencyInfo;

  protected static getHeadersStatic(): ReportHeaderName[] {
    return [
      ReportHeaderName.id,
      ReportHeaderName.date,
      ReportHeaderName.currencyInfo
    ];
  }

  abstract calculateTotal(): void;

  abstract getValueByHeaderName(headerName: string): number | string | Date;

  abstract getHeaders(): ReportHeaderName[];

  abstract setValueByHeaderName(headerName: string, value: any): void;

  abstract setCurrency(value: CurrencyInfo): void;

  public convertMoneyValueToDisplayString(value: number): string {
    if (value === undefined || isNaN(value) || value === null) {
      return '-';
    }
    return value >= 0 ? `${Math.round(value * 100) / 100} ${this.currencyInfo.abbreviation.shortDisplayName} ${this.currencyInfo.currency.shortDisplayName}` :
      `(${Math.round(- value * 100) / 100}) ${this.currencyInfo.abbreviation.shortDisplayName} ${this.currencyInfo.currency.shortDisplayName}`;
  }
}
