import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../model/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/reportType';
import {CurrencyInfo} from '../model/currencyInfo';
import {ExchangeService} from './exchange.service';
import {CurrencyService} from './currency.service';
import {ReportHeaderName} from '../model/reportHeaderName';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
              private currencyService: CurrencyService) {
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

  recalcReportsAfterChangeCurrency(reports: Array<Report>, currency: CurrencyInfo): void {
    reports.map(r => r.setCurrency(currency));
  }

  getReports(tickers: string[], reportType: ReportType): Observable<Report[]> {
    const parameters = {ticker: tickers};
    return this.http.get<Report[]>(`${environment.apiUrl}/report/${reportType}`, {params: parameters});
  }
}
