import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../model/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/reportType';
import {CurrencyInfo} from '../model/currencyInfo';
import {ExchangeService} from "./exchange.service";
import {CurrencyService} from "./currency.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
              private currencyService: CurrencyService) {
  }

  calcReportAfterChangeCurrency(report: Report, currency: CurrencyInfo): Report {
    return report;
  }

  calcReportsAfterChangeCurrency(reports: Array<Report>, currency: CurrencyInfo): Array<Report> {
    console.log('recalc');
    console.log(this.currencyService.currencyFactor(currency) + ' - factor');
    // for (let i = 0; i < reports.length; i++) {
    //   reports[i]
    // }
    return reports;
  }

  getReports(tickers: string[], reportType: ReportType): Observable<Report[]> {
    const parameters = {ticker: tickers};
    return this.http.get<Report[]>(`${environment.apiUrl}/report/${reportType}`, {params: parameters});
  }
}
