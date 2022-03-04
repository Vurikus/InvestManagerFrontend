import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IReport, Report} from '../model/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/reportType';
import {CurrencyInfo} from '../model/currencyInfo';
import {CurrencyService} from './currency.service';
import {ReportHeaderName} from '../model/reportHeaderName';
import {BalanceSheet, IBalanceSheet} from '../model/balanceSheet';
import {IIncomeStatement, IncomeStatement} from '../model/incomeStatement';
import {Company} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
              private currencyService: CurrencyService) {
  }

  public static createEmptyReport(type: ReportType, company: Company): Report {
    if (type === ReportType.BALANCE_SHEET) {
      return new BalanceSheet(company);
    } else if (type === ReportType.INCOME_STATEMENT) {
      return new IncomeStatement(company);
    }
  }

  public static getTotalRows(): Array<ReportHeaderName> {
    return [
      ReportHeaderName.crossProfit,
      ReportHeaderName.netProfit,
      ReportHeaderName.operatingProfit,
      ReportHeaderName.nc_totalAssets,
      ReportHeaderName.totalAssets,
      ReportHeaderName.e_totalEquity,
      ReportHeaderName.ncl_totalNonCurLiabilities,
      ReportHeaderName.cl_totalCurLiabilities,
      ReportHeaderName.totalLiabilities
    ];
  }

  public static getTitleRows(): Array<ReportHeaderName> {
    return [
      ReportHeaderName.nonCurrentAssets,
      ReportHeaderName.currentAssets,
      ReportHeaderName.equity,
      ReportHeaderName.nonCurrentLiabilities,
      ReportHeaderName.currentLiabilities
    ];
  }

  public static getReportHeaderNamesByType(type: ReportType): Array<ReportHeaderName> {
    switch (type) {
      case ReportType.BALANCE_SHEET:
        return BalanceSheet.getHeadersStatic();
      case ReportType.INCOME_STATEMENT:
        return IncomeStatement.getHeadersStatic();
    }
  }

  public static getReportObjectFromInterface(reports: IReport[], type: ReportType): Array<Report> {
    switch (type) {
      case ReportType.BALANCE_SHEET: {
        return reports.map((r: IBalanceSheet) => new BalanceSheet(r.company, r));
      }
      case ReportType.INCOME_STATEMENT:
        return reports.map((r: IIncomeStatement) => new IncomeStatement(r.company, r));
    }
  }

  recalcReportsAfterChangeCurrency(reports: Array<Report>, currency: CurrencyInfo): void {
    console.log(reports);
    console.log(currency);
    reports.map(r => {
      console.log(r);
      r.setCurrency(currency);
    });
  }

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
