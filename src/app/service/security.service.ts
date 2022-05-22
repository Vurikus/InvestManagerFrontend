import { Injectable } from '@angular/core';
import {Position} from "../model/deal/position";
import {InstrumentType, SecurityType} from "../model/instrument";

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

  public getSecurityTypes(): InstrumentType[]{
    return [
      {name: 'STOCK', displayName: 'Акция'},
      {name: 'BOND', displayName: 'Облигация'},
      {name: 'ETF', displayName: 'Фонд'},
      {name: 'CURRENCY', displayName: 'Валюта'}
    ];
  }
}
