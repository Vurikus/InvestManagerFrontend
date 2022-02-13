import {CurrencyInfo} from './currencyInfo';
import {Report} from './report';
import {ReportHeaderName} from './reportHeaderName';

export class BalanceSheet extends Report{
  id: number;
  date: Date;
  currencyInfo: CurrencyInfo;

  static getHeadersStatic(): ReportHeaderName[]{
    return [ReportHeaderName.id,
      ReportHeaderName.date,
      ReportHeaderName.currencyInfo
    ];
  }

  getValueByHeaderName(headerName: ReportHeaderName): number | string | Date {
    switch (headerName){
      case ReportHeaderName.id: return this.id;
      case ReportHeaderName.date: return this.date;
      case ReportHeaderName.currencyInfo: return this.currencyInfo.currency;
      default: return '';
    }
  }

  setValueByHeaderName(headerName: string, value: any): void {
    switch (headerName){
      case ReportHeaderName.id: this.id = value; break;
      case ReportHeaderName.date: this.date = value; break;
      case ReportHeaderName.currencyInfo: this.currencyInfo = value; break;
      default: throw new Error(`Report header '${headerName}' not found`);
    }
  }

  getHeaders(): ReportHeaderName[]{
    return BalanceSheet.getHeadersStatic();
  }

  setCurrency(value: CurrencyInfo): void {
  }
}
