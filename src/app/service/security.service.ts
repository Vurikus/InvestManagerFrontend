import {Injectable} from '@angular/core';
import {Position} from "../model/deal/position";
import {ISecurity, SecurityDisplayType, SecurityType} from "../model/ISecurity";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  public static getSecurityTypeEmptyPositionMap(): Map<SecurityType, Array<Position>>{
    const map = new Map<SecurityType, Array<Position>>();
    Object.values(SecurityType).forEach(stype => map.set(stype, []));
    return map;
  }

  public getSecurities(types?: SecurityType[]): Observable<Array<ISecurity>>{
    return this.http.get<Array<ISecurity>>(`${environment.apiUrl}/security`, {params: {['type']: types}});
  }

  public getSecurityTypes(): SecurityDisplayType[]{
    return [
      {name: 'STOCK', displayName: 'Акция', type: SecurityType.STOCK},
      {name: 'BOND', displayName: 'Облигация', type: SecurityType.BOND},
      {name: 'ETF', displayName: 'Фонд', type: SecurityType.ETF},
      {name: 'CURRENCY', displayName: 'Валюта', type: SecurityType.CURRENCY}
    ];
  }
}
