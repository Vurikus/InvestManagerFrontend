import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Report} from '../model/report';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ReportType} from '../model/reportType';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getReports(ticker: string, reportType: ReportType): Observable<Report[]>{
    return this.http.get<Report[]>(`${environment.url}/report/${ticker}/${reportType}`);
  }
}
