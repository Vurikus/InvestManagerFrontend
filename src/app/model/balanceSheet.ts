import {CurrencyInfo} from './currencyInfo';
import {Report} from './report';
import {ReportHeaderName} from './reportHeaderName';

export class BalanceSheet extends Report{
  //NonCurrentAssets
  nc_fixedAssets: number;
  nc_investmentsAssociates: number;
  nc_goodwill: number;
  nc_intangibleAssets: number;
  nc_otherAssets: number;
  nc_receivables: number;
  nc_totalAssets: number;

  //CurrentAssets
  c_inventories: number;
  c_otherAssets: number;
  c_receivables: number;
  c_currentIncomeTax: number;
  c_cash: number;
  c_totalAssets: number;

  totalAssets: number;

  //Equity
  e_shareCapital: number;
  e_sharePremium: number;
  e_reserveCapital: number;
  e_additionalCapital: number;
  e_retainedEarning: number;
  e_totalOwners: number;
  e_nonControlInterests: number;
  e_totalEquity: number;

  //NonCurrentLiabilities
  ncl_borrowings: number;
  ncl_otherLeaseLiabilities: number;
  ncl_tradePayables: number;
  ncl_contractLiabilities: number;
  ncl_deferredTaxLiabilities: number;
  ncl_totalNonCurLiabilities: number;

  //CurrentLiabilities
  cl_borrowings: number;
  cl_otherLeaseLiabilities: number;
  cl_tradePayables: number;
  cl_contractLiabilities: number;
  cl_currentTaxLiabilities: number;
  cl_totalCurLiabilities: number;

  totalLiabilities: number;

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
      case ReportHeaderName.currencyInfo: return this.currencyInfo.currency.name;
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
      case ReportHeaderName.profitPerStock: return (this.profitPerStock !== undefined && !isNaN(this.profitPerStock)) ? `${this.profitPerStock} ${this.currencyInfo.currency.shortDisplayName}` : '-';
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
