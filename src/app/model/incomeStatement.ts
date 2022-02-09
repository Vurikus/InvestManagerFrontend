import {CurrencyInfo} from './currencyInfo';
import {Report} from './report';
import {ReportHeaderName} from './ReportHeaderName';

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

  getHeaders(): ReportHeaderName[]{
    return [ReportHeaderName.id,
      ReportHeaderName.date,
      ReportHeaderName.currencyInfo,
      ReportHeaderName.revenue,
      ReportHeaderName.costSales
    ];
  }
}
