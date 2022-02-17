import {CurrencyInfo} from './currencyInfo';
import {Report} from './report';
import {ReportHeaderName} from './reportHeaderName';

export class IncomeStatement extends Report{
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
    return [
      ReportHeaderName.revenue,
      ReportHeaderName.costSales,
      ReportHeaderName.crossProfit,
      ReportHeaderName.sellingAndMarketingCost,
      ReportHeaderName.administrativeExpenses,
      ReportHeaderName.otherIncome,
      ReportHeaderName.otherLosses,
      ReportHeaderName.operatingProfit,
      ReportHeaderName.financeIncome,
      ReportHeaderName.financeCosts,
      ReportHeaderName.exchangeTransaction,
      ReportHeaderName.incomeTax,
      ReportHeaderName.ownersProfit,
      ReportHeaderName.nonControlInterests,
      ReportHeaderName.netProfitBeforeTax,
      ReportHeaderName.netProfit,
      ReportHeaderName.profitPerStock
    ];
  }

  getValueByHeaderName(headerName: ReportHeaderName): number | string | Date {
    switch (headerName){
      case ReportHeaderName.id: return this.id;
      case ReportHeaderName.date: return this.date;
      case ReportHeaderName.currencyInfo: return this.currencyInfo.currency;
      case ReportHeaderName.revenue: return this.convertMoneyValueToDisplayString(this.revenue);
      case ReportHeaderName.costSales: return this.convertMoneyValueToDisplayString(this.costSales);
      case ReportHeaderName.crossProfit: return this.convertMoneyValueToDisplayString(this.crossProfit);
      case ReportHeaderName.sellingAndMarketingCost: return this.convertMoneyValueToDisplayString(this.sellingAndMarketingCost);
      case ReportHeaderName.administrativeExpenses: return this.convertMoneyValueToDisplayString(this.administrativeExpenses);
      case ReportHeaderName.otherIncome: return this.convertMoneyValueToDisplayString(this.otherIncome);
      case ReportHeaderName.otherLosses: return this.convertMoneyValueToDisplayString(this.otherLosses);
      case ReportHeaderName.operatingProfit: return this.convertMoneyValueToDisplayString(this.operatingProfit);
      case ReportHeaderName.financeIncome: return this.convertMoneyValueToDisplayString(this.financeIncome);
      case ReportHeaderName.financeCosts: return this.convertMoneyValueToDisplayString(this.financeCosts);
      case ReportHeaderName.exchangeTransaction: return this.convertMoneyValueToDisplayString(this.exchangeTransaction);
      case ReportHeaderName.incomeTax: return this.convertMoneyValueToDisplayString(this.incomeTax);
      case ReportHeaderName.ownersProfit: return this.convertMoneyValueToDisplayString(this.ownersProfit);
      case ReportHeaderName.nonControlInterests: return this.convertMoneyValueToDisplayString(this.nonControlInterests);
      case ReportHeaderName.netProfit: return this.convertMoneyValueToDisplayString(this.netProfit);
      case ReportHeaderName.netProfitBeforeTax: return this.convertMoneyValueToDisplayString(this.netProfitBeforeTax);
      case ReportHeaderName.countStocks: return this.countStocks;
      case ReportHeaderName.profitPerStock: return this.profitPerStock !== undefined ? `${this.profitPerStock} ${this.currencyInfo.currency}` : '-';
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

  setCurrency(value: CurrencyInfo, factor: number): void {
    // this.currencyInfo = value;
    // const factor = currencyFactor(value);
    // const
  }
}
