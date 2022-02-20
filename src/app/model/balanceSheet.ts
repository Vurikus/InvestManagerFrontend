import {CurrencyInfo} from './currencyInfo';
import {Report} from './report';
import {ReportHeaderName} from './reportHeaderName';
import {CurrencyService} from "../service/currency.service";

export class BalanceSheet extends Report {
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
      case ReportHeaderName.id:
        this.id = value;
        break;
      case ReportHeaderName.date:
        this.date = value;
        break;
      case ReportHeaderName.currencyInfo:
        this.currencyInfo = value;
        break;
      default:
        throw new Error(`Report header '${headerName}' not found`);
    }
  }

  getHeaders(): ReportHeaderName[] {
    return BalanceSheet.getHeadersStatic();
  }

  setCurrency(value: CurrencyInfo): void {
    const factor = CurrencyService.currencyFactor(value, this.currencyInfo);

  }
}
