import {CurrencyInfo} from './currencyInfo';
import {IReport, Report} from './report';
import {ReportHeaderName} from './reportHeaderName';
import {CurrencyService} from '../service/currency.service';
import {ReportType} from "./reportType";
import {Company} from "./company";

export interface IIncomeStatement extends IReport {
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
}

export class IncomeStatement extends Report implements IIncomeStatement {
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
  netProfitBeforeTax: number;
  netProfit: number;
  // Other
  countStocks: number;
  profitPerStock: number;

  constructor(c?: Company, r?: IIncomeStatement) {
    super(c, r);
    this.type = ReportType.INCOME_STATEMENT;
    this.revenue = r?.revenue ?? 0;
    this.costSales = r?.costSales ?? 0;
    this.crossProfit = r?.crossProfit ?? 0;
    this.sellingAndMarketingCost = r?.sellingAndMarketingCost ?? 0;
    this.administrativeExpenses = r?.administrativeExpenses ?? 0;
    this.otherIncome = r?.otherIncome ?? 0;
    this.otherLosses = r?.otherLosses ?? 0;
    this.operatingProfit = r?.operatingProfit ?? 0;
    this.financeIncome = r?.financeIncome ?? 0;
    this.financeCosts = r?.financeCosts ?? 0;
    this.exchangeTransaction = r?.exchangeTransaction ?? 0;
    this.incomeTax = r?.incomeTax ?? 0;
    this.ownersProfit = r?.ownersProfit ?? 0;
    this.nonControlInterests = r?.nonControlInterests ?? 0;
    this.netProfit = r?.netProfit ?? 0;
    this.netProfitBeforeTax = r?.netProfitBeforeTax ?? 0;
    this.profitPerStock = r?.profitPerStock ?? 0;
  }

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
      case ReportHeaderName.profitPerStock: return (this.profitPerStock !== undefined && !isNaN(this.profitPerStock)) ? `${Math.round(this.profitPerStock * 100) / 100} ${this.currencyInfo.currency.shortDisplayName}` : '-';
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
      case ReportHeaderName.crossProfit: this.crossProfit = value; break;
      case ReportHeaderName.sellingAndMarketingCost: this.sellingAndMarketingCost = value; break;
      case ReportHeaderName.administrativeExpenses: this.administrativeExpenses = value; break;
      case ReportHeaderName.otherIncome: this.otherIncome = value; break;
      case ReportHeaderName.otherLosses: this.otherLosses = value; break;
      case ReportHeaderName.operatingProfit: this.operatingProfit = value; break;
      case ReportHeaderName.financeIncome: this.financeIncome = value; break;
      case ReportHeaderName.financeCosts: this.financeCosts = value; break;
      case ReportHeaderName.exchangeTransaction: this.exchangeTransaction = value; break;
      case ReportHeaderName.incomeTax: this.incomeTax = value; break;
      case ReportHeaderName.ownersProfit: this.ownersProfit = value; break;
      case ReportHeaderName.nonControlInterests: this.nonControlInterests = value; break;
      case ReportHeaderName.netProfit: this.netProfit = value; break;
      case ReportHeaderName.netProfitBeforeTax: this.netProfitBeforeTax = value; break;
      case ReportHeaderName.countStocks: this.countStocks = value; break;
    }
  }

  getHeaders(): ReportHeaderName[]{
    return IncomeStatement.getHeadersStatic();
  }

  setCurrency(currencyInfo: CurrencyInfo): void {
    const factor = CurrencyService.currencyFactor(currencyInfo, this.currencyInfo);
    this.profitPerStock = this.profitPerStock * (this.currencyInfo.currency.rate / currencyInfo.currency.rate);
    this.currencyInfo = CurrencyService.clone(currencyInfo);
    this.revenue = factor * this.revenue;
    this.costSales = factor * this.costSales;
    this.crossProfit = factor * this.crossProfit;
    // OperatingProfit
    this.sellingAndMarketingCost = factor * this.sellingAndMarketingCost;
    this.administrativeExpenses = factor * this.administrativeExpenses;
    this.otherIncome = factor * this.otherIncome;
    this.otherLosses = factor * this.otherLosses;
    this.operatingProfit = factor * this.operatingProfit;
    // NetProfit
    this.financeIncome = factor * this.financeIncome;
    this.financeCosts = factor * this.financeCosts;
    this.exchangeTransaction = factor * this.exchangeTransaction;
    this.incomeTax = factor * this.incomeTax;
    this.ownersProfit = factor * this.ownersProfit;
    this.nonControlInterests = factor * this.nonControlInterests;
    this.netProfit = factor * this.netProfit;
    this.netProfitBeforeTax = factor * this.netProfitBeforeTax;
    // Other
    // this.profitPerStock = factor * this.profitPerStock;
  }
}
