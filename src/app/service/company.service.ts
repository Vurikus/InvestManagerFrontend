import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ICompany} from '../model/ICompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<ICompany[]>{
    return this.http.get<ICompany[]>(`${environment.apiUrl}/company`);
  }

  getCompaniesBySearch(input: string): Observable<ICompany[]>{
    console.log('http getCompaniesBySearch');
    return this.http.get<ICompany[]>(`${environment.apiUrl}/company?search=${input}`);
  }
}
