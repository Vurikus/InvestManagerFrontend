/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IReport, Report} from '../model/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/reportType';
import {CurrencyInfo} from '../model/currencyInfo';
import {CurrencyService} from './currency.service';
import {IIncomeStatement} from '../model/incomeStatement';
import {Company} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private currentCurrency: CurrencyInfo;

  constructor(private http: HttpClient,
              private currencyService: CurrencyService) {
  }

  setCurrencyInfo(c: CurrencyInfo): void{
    this.currentCurrency = c;
  }

  public recalculate(reports: IReport[], newCurrencyInfo: CurrencyInfo): Array<IReport> {
    if (reports.length === 0) {
      return reports;
    }
    newCurrencyInfo = CurrencyService.clone(newCurrencyInfo);
    if (reports[0].type === ReportType.INCOME_STATEMENT) {
      const factor = CurrencyService.currencyFactor(newCurrencyInfo, reports[0].currencyInfo);
      reports.forEach((r: IIncomeStatement) => {
        r.profitPerStock = r.profitPerStock * (r.currencyInfo.currency.rate / newCurrencyInfo.currency.rate);
        r.currencyInfo = newCurrencyInfo;
        r.revenue = factor * r.revenue;
        r.costSales = factor * r.costSales;
        r.crossProfit = factor * r.crossProfit;
        // OperatingProfit
        r.sellingAndMarketingCost = factor * r.sellingAndMarketingCost;
        r.administrativeExpenses = factor * r.administrativeExpenses;
        r.otherIncome = factor * r.otherIncome;
        r.otherLosses = factor * r.otherLosses;
        r.operatingProfit = factor * r.operatingProfit;
        // NetProfit
        r.financeIncome = factor * r.financeIncome;
        r.financeCosts = factor * r.financeCosts;
        r.exchangeTransaction = factor * r.exchangeTransaction;
        r.incomeTax = factor * r.incomeTax;
        r.ownersProfit = factor * r.ownersProfit;
        r.nonControlInterests = factor * r.nonControlInterests;
        r.netProfit = factor * r.netProfit;
        r.netProfitBeforeTax = factor * r.netProfitBeforeTax;
      });
    }
    return reports;
  }

  public createEmptyReport(type: ReportType, c: Company, currency: CurrencyInfo): IReport {
    if (type === ReportType.BALANCE_SHEET) {
      // const is: IIncomeStatement = {company: company};
      // return is;
    } else if (type === ReportType.INCOME_STATEMENT) {
      return {currencyInfo: CurrencyService.clone(currency), date: new Date(), id: null, company: c, type: ReportType.INCOME_STATEMENT};
    }
  }
  //
  // public static getTotalRows(): Array<ReportHeaderName> {
  //   return [
  //     ReportHeaderName.crossProfit,
  //     ReportHeaderName.netProfit,
  //     ReportHeaderName.operatingProfit,
  //     ReportHeaderName.nc_totalAssets,
  //     ReportHeaderName.totalAssets,
  //     ReportHeaderName.e_totalEquity,
  //     ReportHeaderName.ncl_totalNonCurLiabilities,
  //     ReportHeaderName.cl_totalCurLiabilities,
  //     ReportHeaderName.totalLiabilities
  //   ];
  // }
  //
  // public static getTitleRows(): Array<ReportHeaderName> {
  //   return [
  //     ReportHeaderName.nonCurrentAssets,
  //     ReportHeaderName.currentAssets,
  //     ReportHeaderName.equity,
  //     ReportHeaderName.nonCurrentLiabilities,
  //     ReportHeaderName.currentLiabilities
  //   ];
  // }
  //
  // public static getReportHeaderNamesByType(type: ReportType): Array<ReportHeaderName> {
  //   switch (type) {
  //     case ReportType.BALANCE_SHEET:
  //       return BalanceSheet.getHeadersStatic();
  //     case ReportType.INCOME_STATEMENT:
  //       return IncomeStatement.getHeadersStatic();
  //   }
  // }
  //
  // public static getReportObjectFromInterface(reports: IReport[], type: ReportType): Array<Report> {
  //   switch (type) {
  //     case ReportType.BALANCE_SHEET: {
  //       return reports.map((r: IBalanceSheet) => new BalanceSheet(r.company, r));
  //     }
  //     case ReportType.INCOME_STATEMENT:
  //       return reports.map((r: IIncomeStatement) => new IncomeStatement(r.company, r));
  //   }
  // }
  //
  // recalcReportsAfterChangeCurrency(reports: Array<Report>, currency: CurrencyInfo): void {
  //   console.log(reports);
  //   console.log(currency);
  //   reports.map(r => {
  //     console.log(r);
  //     r.setCurrency(currency);
  //   });
  // }

  getReports(tickers: string[], reportType: ReportType): Observable<Report[]> {
    const parameters = {ticker: tickers};
    return this.http.get<Report[]>(`${environment.apiUrl}/report/${reportType}`, {params: parameters});
  }

  sendReport(report: Report): void {
    const url = `${environment.apiUrl}/report/${report.company.ticker}/${report.type}`;
    if (report.id) {
      this.http.put<Report>(url, report).subscribe((res: any) => {
        console.log(res);
      });
    } else {
      this.http.post<Report>(url, report).subscribe((res: any) => {
        console.log(res);
      });
    }
  }
}
