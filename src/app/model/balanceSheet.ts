import {CurrencyInfo} from './currencyInfo';
import {IReport, Report} from './report';
import {ReportHeaderName} from './reportHeaderName';
import {CurrencyService} from '../service/currency.service';
import {ReportType} from './reportType';
import {Company} from './company';

export interface IBalanceSheet extends IReport {
  // NonCurrentAssets
  nc_fixedAssets: number;
  nc_investmentsAssociates: number;
  nc_goodwill: number;
  nc_intangibleAssets: number;
  nc_otherAssets: number;
  nc_receivables: number;
  nc_totalAssets: number;
  // CurrentAssets
  c_inventories: number;
  c_otherAssets: number;
  c_receivables: number;
  c_currentIncomeTax: number;
  c_cash: number;
  c_totalAssets: number;
  totalAssets: number;
  // Equity
  e_shareCapital: number;
  e_reserveCapital: number;
  e_additionalCapital: number;
  e_retainedEarning: number;
  e_totalOwners: number;
  e_nonControlInterests: number;
  e_totalEquity: number;
  // NonCurrentLiabilities
  ncl_borrowings: number;
  ncl_otherLeaseLiabilities: number;
  ncl_tradePayables: number;
  ncl_contractLiabilities: number;
  ncl_deferredTaxLiabilities: number;
  ncl_totalNonCurLiabilities: number;
  // CurrentLiabilities
  cl_borrowings: number;
  cl_otherLeaseLiabilities: number;
  cl_tradePayables: number;
  cl_contractLiabilities: number;
  cl_currentTaxLiabilities: number;
  cl_totalCurLiabilities: number;
  totalLiabilities: number;
}

export class BalanceSheet extends Report implements IBalanceSheet {

  constructor(c?: Company, r?: IBalanceSheet) {
    super(c, r);
    this.type = ReportType.BALANCE_SHEET;
    this.nc_fixedAssets = r?.nc_fixedAssets ?? 0;
    this.nc_investmentsAssociates = r?.nc_investmentsAssociates ?? 0;
    this.nc_goodwill = r?.nc_goodwill ?? 0;
    this.nc_intangibleAssets = r?.nc_intangibleAssets ?? 0;
    this.nc_otherAssets = r?.nc_otherAssets ?? 0;
    this.nc_receivables = r?.nc_receivables ?? 0;
    this.nc_totalAssets = r?.nc_totalAssets ?? 0;
    this.c_inventories = r?.c_inventories ?? 0;
    this.c_otherAssets = r?.c_otherAssets ?? 0;
    this.c_receivables = r?.c_receivables ?? 0;
    this.c_currentIncomeTax = r?.c_currentIncomeTax ?? 0;
    this.c_cash = r?.c_cash ?? 0;
    this.c_totalAssets = r?.c_totalAssets ?? 0;
    this.totalAssets = r?.totalAssets ?? 0;
    this.e_shareCapital = r?.e_shareCapital ?? 0;
    this.e_reserveCapital = r?.e_reserveCapital ?? 0;
    this.e_additionalCapital = r?.e_additionalCapital ?? 0;
    this.e_retainedEarning = r?.e_retainedEarning ?? 0;
    this.e_totalOwners = r?.e_totalOwners ?? 0;
    this.e_nonControlInterests = r?.e_nonControlInterests ?? 0;
    this.e_totalEquity = r?.e_totalEquity ?? 0;
    this.ncl_borrowings = r?.ncl_borrowings ?? 0;
    this.ncl_otherLeaseLiabilities = r?.ncl_otherLeaseLiabilities ?? 0;
    this.ncl_tradePayables = r?.ncl_tradePayables ?? 0;
    this.ncl_contractLiabilities = r?.ncl_contractLiabilities ?? 0;
    this.ncl_deferredTaxLiabilities = r?.ncl_deferredTaxLiabilities ?? 0;
    this.ncl_totalNonCurLiabilities = r?.ncl_totalNonCurLiabilities ?? 0;
    this.cl_borrowings = r?.cl_borrowings ?? 0;
    this.cl_otherLeaseLiabilities = r?.cl_otherLeaseLiabilities ?? 0;
    this.cl_tradePayables = r?.cl_tradePayables ?? 0;
    this.cl_contractLiabilities = r?.cl_contractLiabilities ?? 0;
    this.cl_currentTaxLiabilities = r?.cl_currentTaxLiabilities ?? 0;
    this.cl_totalCurLiabilities = r?.cl_totalCurLiabilities ?? 0;
    this.totalLiabilities = r?.totalLiabilities ?? 0;
  }
  // NonCurrentAssets
  nc_fixedAssets: number;
  nc_investmentsAssociates: number;
  nc_goodwill: number;
  nc_intangibleAssets: number;
  nc_otherAssets: number;
  nc_receivables: number;
  nc_totalAssets: number;
  // CurrentAssets
  c_inventories: number;
  c_otherAssets: number;
  c_receivables: number;
  c_currentIncomeTax: number;
  c_cash: number;
  c_totalAssets: number;
  totalAssets: number;
  // Equity
  e_shareCapital: number;
  e_reserveCapital: number;
  e_additionalCapital: number;
  e_retainedEarning: number;
  e_totalOwners: number;
  e_nonControlInterests: number;
  e_totalEquity: number;
  // NonCurrentLiabilities
  ncl_borrowings: number;
  ncl_otherLeaseLiabilities: number;
  ncl_tradePayables: number;
  ncl_contractLiabilities: number;
  ncl_deferredTaxLiabilities: number;
  ncl_totalNonCurLiabilities: number;
  // CurrentLiabilities
  cl_borrowings: number;
  cl_otherLeaseLiabilities: number;
  cl_tradePayables: number;
  cl_contractLiabilities: number;
  cl_currentTaxLiabilities: number;
  cl_totalCurLiabilities: number;
  totalLiabilities: number;

  static getHeadersStatic(): ReportHeaderName[] {
    return [
      ReportHeaderName.nonCurrentAssets,
      ReportHeaderName.nc_fixedAssets,
      ReportHeaderName.nc_investmentsAssociates,
      ReportHeaderName.nc_goodwill,
      ReportHeaderName.nc_intangibleAssets,
      ReportHeaderName.nc_otherAssets,
      ReportHeaderName.nc_receivables,
      ReportHeaderName.nc_totalAssets,
      ReportHeaderName.currentAssets,
      ReportHeaderName.c_inventories,
      ReportHeaderName.c_receivables,
      ReportHeaderName.c_currentIncomeTax,
      ReportHeaderName.c_cash,
      ReportHeaderName.c_otherAssets,
      ReportHeaderName.c_totalAssets,
      ReportHeaderName.totalAssets,
      ReportHeaderName.equity,
      ReportHeaderName.e_shareCapital,
      ReportHeaderName.e_additionalCapital,
      ReportHeaderName.e_reserveCapital,
      ReportHeaderName.e_retainedEarning,
      ReportHeaderName.e_totalOwners,
      ReportHeaderName.e_nonControlInterests,
      ReportHeaderName.e_totalEquity,
      ReportHeaderName.nonCurrentLiabilities,
      ReportHeaderName.ncl_borrowings,
      ReportHeaderName.ncl_otherLeaseLiabilities,
      ReportHeaderName.ncl_tradePayables,
      ReportHeaderName.ncl_contractLiabilities,
      ReportHeaderName.ncl_deferredTaxLiabilities,
      ReportHeaderName.ncl_totalNonCurLiabilities,
      ReportHeaderName.currentLiabilities,
      ReportHeaderName.cl_borrowings,
      ReportHeaderName.cl_otherLeaseLiabilities,
      ReportHeaderName.cl_tradePayables,
      ReportHeaderName.cl_contractLiabilities,
      ReportHeaderName.cl_currentTaxLiabilities,
      ReportHeaderName.cl_totalCurLiabilities,
      ReportHeaderName.totalLiabilities
    ];
  }

  calculateTotal(): void {
    this.nc_totalAssets = this.nc_fixedAssets + this.nc_investmentsAssociates + this.nc_goodwill + this.nc_intangibleAssets + this.nc_otherAssets + this.nc_receivables;
    this.c_totalAssets = this.c_inventories + this.c_otherAssets + this.c_receivables + this.c_currentIncomeTax + this.c_cash;
    this.totalAssets = this.c_totalAssets + this.nc_totalAssets;
    this.e_totalOwners = this.e_shareCapital + this.e_additionalCapital + this.e_reserveCapital + this.e_retainedEarning;
    this.e_totalEquity = this.e_shareCapital + this.e_additionalCapital + this.e_reserveCapital + this.e_retainedEarning + this.e_nonControlInterests;
    this.ncl_totalNonCurLiabilities = this.ncl_borrowings + this.ncl_otherLeaseLiabilities + this.ncl_tradePayables + this.ncl_contractLiabilities + this.ncl_deferredTaxLiabilities;
    this.cl_totalCurLiabilities = this.cl_borrowings + this.cl_otherLeaseLiabilities + this.cl_tradePayables + this.cl_contractLiabilities + this.cl_currentTaxLiabilities;
    this.totalLiabilities = this.ncl_totalNonCurLiabilities + this.cl_totalCurLiabilities;
  }

  getValueByHeaderName(headerName: ReportHeaderName): number | string | Date {
    switch (headerName) {
      case ReportHeaderName.id: return this.id;
      case ReportHeaderName.date: return this.date;
      case ReportHeaderName.currencyInfo: return this.currencyInfo.currency.name;
      case ReportHeaderName.nonCurrentAssets: return '';
      case ReportHeaderName.nc_fixedAssets: return this.convertMoneyValueToDisplayString(this.nc_fixedAssets);
      case ReportHeaderName.nc_investmentsAssociates: return this.convertMoneyValueToDisplayString(this.nc_investmentsAssociates);
      case ReportHeaderName.nc_goodwill: return this.convertMoneyValueToDisplayString(this.nc_goodwill);
      case ReportHeaderName.nc_intangibleAssets: return this.convertMoneyValueToDisplayString(this.nc_intangibleAssets);
      case ReportHeaderName.nc_otherAssets: return this.convertMoneyValueToDisplayString(this.nc_otherAssets);
      case ReportHeaderName.nc_receivables: return this.convertMoneyValueToDisplayString(this.nc_receivables);
      case ReportHeaderName.nc_totalAssets: return this.convertMoneyValueToDisplayString(this.nc_totalAssets);
      case ReportHeaderName.currentAssets: return '';
      case ReportHeaderName.c_inventories: return this.convertMoneyValueToDisplayString(this.c_inventories);
      case ReportHeaderName.c_receivables: return this.convertMoneyValueToDisplayString(this.c_receivables);
      case ReportHeaderName.c_cash: return this.convertMoneyValueToDisplayString(this.c_cash);
      case ReportHeaderName.c_currentIncomeTax: return this.convertMoneyValueToDisplayString(this.c_currentIncomeTax);
      case ReportHeaderName.c_otherAssets: return this.convertMoneyValueToDisplayString(this.c_otherAssets);
      case ReportHeaderName.c_totalAssets: return this.convertMoneyValueToDisplayString(this.c_totalAssets);
      case ReportHeaderName.totalAssets: return this.convertMoneyValueToDisplayString(this.totalAssets);
      case ReportHeaderName.equity: return '';
      case ReportHeaderName.e_shareCapital: return this.convertMoneyValueToDisplayString(this.e_shareCapital);
      case ReportHeaderName.e_reserveCapital: return this.convertMoneyValueToDisplayString(this.e_reserveCapital);
      case ReportHeaderName.e_additionalCapital: return this.convertMoneyValueToDisplayString(this.e_additionalCapital);
      case ReportHeaderName.e_retainedEarning: return this.convertMoneyValueToDisplayString(this.e_retainedEarning);
      case ReportHeaderName.e_totalOwners: return this.convertMoneyValueToDisplayString(this.e_totalOwners);
      case ReportHeaderName.e_nonControlInterests: return this.convertMoneyValueToDisplayString(this.e_nonControlInterests);
      case ReportHeaderName.e_totalEquity: return this.convertMoneyValueToDisplayString(this.e_totalEquity);
      case ReportHeaderName.nonCurrentLiabilities: return '';
      case ReportHeaderName.ncl_borrowings: return this.convertMoneyValueToDisplayString(this.ncl_borrowings);
      case ReportHeaderName.ncl_tradePayables: return this.convertMoneyValueToDisplayString(this.ncl_tradePayables);
      case ReportHeaderName.ncl_contractLiabilities: return this.convertMoneyValueToDisplayString(this.ncl_contractLiabilities);
      case ReportHeaderName.ncl_deferredTaxLiabilities: return this.convertMoneyValueToDisplayString(this.ncl_deferredTaxLiabilities);
      case ReportHeaderName.ncl_otherLeaseLiabilities: return this.convertMoneyValueToDisplayString(this.ncl_otherLeaseLiabilities);
      case ReportHeaderName.ncl_totalNonCurLiabilities: return this.convertMoneyValueToDisplayString(this.ncl_totalNonCurLiabilities);
      case ReportHeaderName.currentLiabilities: return '';
      case ReportHeaderName.cl_borrowings: return this.convertMoneyValueToDisplayString(this.cl_borrowings);
      case ReportHeaderName.cl_tradePayables: return this.convertMoneyValueToDisplayString(this.cl_tradePayables);
      case ReportHeaderName.cl_contractLiabilities: return this.convertMoneyValueToDisplayString(this.cl_contractLiabilities);
      case ReportHeaderName.cl_currentTaxLiabilities: return this.convertMoneyValueToDisplayString(this.cl_currentTaxLiabilities);
      case ReportHeaderName.cl_otherLeaseLiabilities: return this.convertMoneyValueToDisplayString(this.cl_otherLeaseLiabilities);
      case ReportHeaderName.cl_totalCurLiabilities: return this.convertMoneyValueToDisplayString(this.cl_totalCurLiabilities);
      case ReportHeaderName.totalLiabilities: return this.convertMoneyValueToDisplayString(this.totalLiabilities);
      default: return '';
    }
  }

  setValueByHeaderName(headerName: string, value: any): void {
    switch (headerName) {
      case ReportHeaderName.id: this.id = value; break;
      case ReportHeaderName.date: this.date = value; break;
      case ReportHeaderName.currencyInfo: this.currencyInfo = value; break;
      case ReportHeaderName.nc_fixedAssets: this.nc_fixedAssets = value; break;
      case ReportHeaderName.nc_investmentsAssociates: this.nc_investmentsAssociates = value; break;
      case ReportHeaderName.nc_goodwill: this.nc_goodwill = value; break;
      case ReportHeaderName.nc_intangibleAssets: this.nc_intangibleAssets = value; break;
      case ReportHeaderName.nc_otherAssets: this.nc_otherAssets = value; break;
      case ReportHeaderName.nc_receivables: this.nc_receivables = value; break;
      case ReportHeaderName.nc_totalAssets: this.nc_totalAssets = value; break;
      case ReportHeaderName.c_inventories: this.c_inventories = value; break;
      case ReportHeaderName.c_receivables: this.c_receivables = value; break;
      case ReportHeaderName.c_cash: this.c_cash = value; break;
      case ReportHeaderName.c_currentIncomeTax: this.c_currentIncomeTax = value; break;
      case ReportHeaderName.c_otherAssets: this.c_otherAssets = value; break;
      case ReportHeaderName.c_totalAssets: this.c_totalAssets = value; break;
      case ReportHeaderName.totalAssets: this.totalAssets = value; break;
      case ReportHeaderName.e_shareCapital: this.e_shareCapital = value; break;
      case ReportHeaderName.e_reserveCapital: this.e_reserveCapital = value; break;
      case ReportHeaderName.e_additionalCapital: this.e_additionalCapital = value; break;
      case ReportHeaderName.e_retainedEarning: this.e_retainedEarning = value; break;
      case ReportHeaderName.e_totalOwners: this.e_totalOwners = value; break;
      case ReportHeaderName.e_nonControlInterests: this.e_nonControlInterests = value; break;
      case ReportHeaderName.e_totalEquity: this.e_totalEquity = value; break;
      case ReportHeaderName.ncl_borrowings: this.ncl_borrowings = value; break;
      case ReportHeaderName.ncl_tradePayables: this.ncl_tradePayables = value; break;
      case ReportHeaderName.ncl_contractLiabilities: this.ncl_contractLiabilities = value; break;
      case ReportHeaderName.ncl_deferredTaxLiabilities: this.ncl_deferredTaxLiabilities = value; break;
      case ReportHeaderName.ncl_otherLeaseLiabilities: this.ncl_otherLeaseLiabilities = value; break;
      case ReportHeaderName.ncl_totalNonCurLiabilities: this.ncl_totalNonCurLiabilities = value; break;
      case ReportHeaderName.cl_borrowings: this.cl_borrowings = value; break;
      case ReportHeaderName.cl_tradePayables: this.cl_tradePayables = value; break;
      case ReportHeaderName.cl_contractLiabilities: this.cl_contractLiabilities = value; break;
      case ReportHeaderName.cl_currentTaxLiabilities: this.cl_currentTaxLiabilities = value; break;
      case ReportHeaderName.cl_otherLeaseLiabilities: this.cl_otherLeaseLiabilities = value; break;
      case ReportHeaderName.cl_totalCurLiabilities: this.cl_totalCurLiabilities = value; break;
      case ReportHeaderName.totalLiabilities: this.totalLiabilities = value; break;
    }
  }

  getHeaders(): ReportHeaderName[] {
    return BalanceSheet.getHeadersStatic();
  }

  setCurrency(value: CurrencyInfo): void {
    const factor = CurrencyService.currencyFactor(value, this.currencyInfo);
    this.currencyInfo = CurrencyService.clone(value);
    this.nc_fixedAssets = this.nc_fixedAssets * factor;
    this.nc_investmentsAssociates = this.nc_investmentsAssociates * factor;
    this.nc_goodwill = this.nc_goodwill * factor;
    this.nc_intangibleAssets = this.nc_intangibleAssets * factor;
    this.nc_otherAssets = this.nc_otherAssets * factor;
    this.nc_receivables = this.nc_receivables * factor;
    this.nc_totalAssets = this.nc_totalAssets * factor;
    this.c_inventories = this.c_inventories * factor;
    this.c_otherAssets = this.c_otherAssets * factor;
    this.c_receivables = this.c_receivables * factor;
    this.c_currentIncomeTax = this.c_currentIncomeTax * factor;
    this.c_cash = this.c_cash * factor;
    this.c_totalAssets = this.c_totalAssets * factor;
    this.totalAssets = this.totalAssets * factor;
    this.e_shareCapital = this.e_shareCapital * factor;
    this.e_reserveCapital = this.e_reserveCapital * factor;
    this.e_additionalCapital = this.e_additionalCapital * factor;
    this.e_retainedEarning = this.e_retainedEarning * factor;
    this.e_totalOwners = this.e_totalOwners * factor;
    this.e_nonControlInterests = this.e_nonControlInterests * factor;
    this.e_totalEquity = this.e_totalEquity * factor;
    this.ncl_borrowings = this.ncl_borrowings * factor;
    this.ncl_otherLeaseLiabilities = this.ncl_otherLeaseLiabilities * factor;
    this.ncl_tradePayables = this.ncl_tradePayables * factor;
    this.ncl_contractLiabilities = this.ncl_contractLiabilities * factor;
    this.ncl_deferredTaxLiabilities = this.ncl_deferredTaxLiabilities * factor;
    this.ncl_totalNonCurLiabilities = this.ncl_totalNonCurLiabilities * factor;
    this.cl_borrowings = this.cl_borrowings * factor;
    this.cl_otherLeaseLiabilities = this.cl_otherLeaseLiabilities * factor;
    this.cl_tradePayables = this.cl_tradePayables * factor;
    this.cl_contractLiabilities = this.cl_contractLiabilities * factor;
    this.cl_currentTaxLiabilities = this.cl_currentTaxLiabilities * factor;
    this.cl_totalCurLiabilities = this.cl_totalCurLiabilities * factor;
    this.totalLiabilities = this.totalLiabilities * factor;
  }
}
