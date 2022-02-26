import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Company} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]>{
    return this.http.get<Company[]>(`${environment.apiUrl}/company`);
  }

  getCompaniesBySearch(input: string): Observable<Company[]>{
    console.log('http getCompaniesBySearch');
    return this.http.get<Company[]>(`${environment.apiUrl}/company?search=${input}`);
  }
}
