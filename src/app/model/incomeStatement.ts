import {CurrencyInfo} from './currencyInfo';
import {Report} from './report';
import {ReportHeaderName} from './reportHeaderName';

export class IncomeStatement implements Report{
  id: number;
  date: Date;
  currencyInfo: CurrencyInfo;
  // CrossProfit
  revenue: number;
  costSales: number;
  crossProfit: number;
  // OperatingProfit
  sellingAndMarketingCost: number;
  administrativeExpenses: number;
  otherIncome: number;
  otherLosses: number;
  operatingProfit: number;
  // NetProfit
  financeIncome: number;
  financeCosts: number;
  exchangeTransaction: number;
  incomeTax: number;
  ownersProfit: number;
  nonControlInterests: number;
  netProfit: number;
  netProfitBeforeTax: number;
  // Other
  countStocks: number;
  profitPerStock: number;

  static getHeadersStatic(): ReportHeaderName[]{
    return [ReportHeaderName.id,
      ReportHeaderName.date,
      ReportHeaderName.currencyInfo,
      ReportHeaderName.revenue,
      ReportHeaderName.costSales
    ];
  }

  getValueByHeaderName(headerName: ReportHeaderName): number | string | Date {
    switch (headerName){
      case ReportHeaderName.id: return this.id;
      case ReportHeaderName.date: return this.date;
      case ReportHeaderName.currencyInfo: return this.currencyInfo.currency;
      case ReportHeaderName.revenue: return this.revenue;
      case ReportHeaderName.costSales: return this.costSales;
      default: return '';
    }
  }

  setValueByHeaderName(headerName: string, value: any): void {
    switch (headerName){
      case ReportHeaderName.id: this.id = value; break;
      case ReportHeaderName.date: this.date = value; break;
      case ReportHeaderName.currencyInfo: this.currencyInfo = value; break;
      case ReportHeaderName.revenue: this.revenue = value; break;
      case ReportHeaderName.costSales: this.costSales = value; break;
      default: throw new Error(`Report header '${headerName}' not found`);
    }
  }

  getHeaders(): ReportHeaderName[]{
    return IncomeStatement.getHeadersStatic();
  }
}
