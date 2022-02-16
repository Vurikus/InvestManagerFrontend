import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../model/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/reportType';
import {CurrencyInfo} from '../model/currencyInfo';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  calcReportAfterChangeCurrency(report: Report, currency: CurrencyInfo): Report {
    return report;
  }

  calcReportsAfterChangeCurrency(reports: Array<Report>, currency: CurrencyInfo): Array<Report> {
    console.log('recalc');
    return reports;
  }

  getReports(tickers: string[], reportType: ReportType): Observable<Report[]> {
    const parameters = {ticker: tickers};
    return this.http.get<Report[]>(`${environment.apiUrl}/report/${reportType}`, {params: parameters});
  }
}
