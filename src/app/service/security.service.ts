import {Injectable} from '@angular/core';
import {Position} from "../model/deal/position";
import {SecurityDisplayType, SecurityType} from "../model/security";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  public static getSecurityTypeEmptyPositionMap(): Map<SecurityType, Array<Position>>{
    const map = new Map<SecurityType, Array<Position>>();
    Object.values(SecurityType).forEach(stype => map.set(stype, []));
    return map;
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
