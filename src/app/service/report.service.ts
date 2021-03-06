/* tslint:disable */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IReport, Report} from '../model/report/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/report/reportType';
import {CurrencyInfo} from '../model/currencyInfo';
import {CurrencyService} from './currency.service';
import {IIncomeStatement, IncomeStatement} from '../model/report/incomeStatement';
import {ICompany} from '../model/ICompany';
import {BalanceSheet} from "../model/report/balanceSheet";
import {IntervalDate} from "../model/intervalDate";

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

  public createEmptyReport(type: ReportType, c: ICompany, currency: CurrencyInfo): Report {
    if (type === ReportType.BALANCE_SHEET) {
      let balanceSheet = new BalanceSheet(c);
      balanceSheet.setCurrency(currency);
      return balanceSheet;
    } else if (type === ReportType.INCOME_STATEMENT) {
      let incomeStatement = new IncomeStatement(c);
      incomeStatement.setCurrency(currency)
      return incomeStatement;
    }
  }

  getReports(tickers: string[], reportType: ReportType, intervalDate?: IntervalDate): Observable<Report[]> {
    const parameters = intervalDate ? {ticker: tickers, interval: intervalDate.covertToQueryString()} : {ticker: tickers};
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
