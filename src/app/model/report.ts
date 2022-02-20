import {ReportHeaderName} from './reportHeaderName';
import {Abbreviation, CurrencyInfo} from './currencyInfo';
import {ExchangeService} from '../service/exchange.service';

export abstract class Report {
  id: number;
  date: Date;

  totalHeaderRow: Array<ReportHeaderName> = [
    ReportHeaderName.crossProfit,
    ReportHeaderName.netProfit,
    ReportHeaderName.operatingProfit,
    ReportHeaderName.nonCurrentAssets,
    ReportHeaderName.nc_totalAssets,
    ReportHeaderName.currentAssets,
    ReportHeaderName.totalAssets,
    ReportHeaderName.equity,
    ReportHeaderName.e_totalEquity,
    ReportHeaderName.nonCurrentLiabilities,
    ReportHeaderName.ncl_totalNonCurLiabilities,
    ReportHeaderName.currentLiabilities,
    ReportHeaderName.cl_totalCurLiabilities,
    ReportHeaderName.totalLiabilities
  ];
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
