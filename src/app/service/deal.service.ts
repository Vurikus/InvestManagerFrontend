import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPosition, Position} from "../model/deal/position";
import {environment} from "../../environments/environment";
import {IPositionEvent} from "../model/deal/positionEvent";
import {stringify} from "@angular/compiler/src/util";
import {Security, SecurityDisplayType, SecurityType} from "../model/ISecurity";
import {SecurityService} from "./security.service";
import {CurrencyService} from "./currency.service";
import {ExchangeService} from "./exchange.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(private http: HttpClient,
              private exchangeService: ExchangeService) { }

  public addEvent(position: Position, event?: IPositionEvent): Observable<IPosition>{
    if (position.id){
      return this.http.post<IPosition>(`${environment.apiUrl}/position/${position.id}/event`, event);
    } else {
      position.addEvent(event);
      return this.http.post<IPosition>(`${environment.apiUrl}/position`, position);
    }
  }

  public getPositions(): Map<SecurityType, Array<Position>>{
    const result = SecurityService.getSecurityTypeEmptyPositionMap();
    this.http.get<Array<Position>>(`${environment.apiUrl}/position`).subscribe((res: IPosition[]) => {
      for (let i = 0; i < res.length; i++) {
        const type = res[i].security.type;
        const positions = result.get(type);
        if (!positions) { continue; }
        const p = this.convertInputPosition(res[i]);
        positions.push(p);
      }
    });
    return result;
  }

  public getPosition(positionId: number, showEvent?: boolean): Position{
    let result: Position;
    this.http.get<Position>(`${environment.apiUrl}/position/${positionId}`, {params: {['showEvent']: showEvent.toString()}})
      .subscribe(res => result = res);
    return result;
  }

  public convertInputPosition(dto: IPosition): Position{
    const p = new Position();
    p.id = dto.id;
    const currency = this.exchangeService.getCurrencyByCode(dto.currencyCode);
    p.security = new Security(dto.security, currency);
    p.company = dto.company;
    p.openDate = dto.openDate;
    p.closeDate = dto.closeDate;
    p.totalResult = dto.totalResult;
    p.totalCommission = dto.totalCommission;
    p.buyPrice = dto.buyPrice;
    p.sumBuyPrice = dto.buyPrice * dto.volume;
    p.actualPrice = dto.actualPrice;
    p.sumActualPrice = dto.actualPrice * dto.volume;
    p.volume = dto.volume;
    p.events = dto.events;
    p.currency = this.exchangeService.getCurrencyByCode(dto.currencyCode);
    p.profit = dto.profit || 0;
    p.profitPercent = dto.profitPercent || 0;
    p.share = dto.share * 100;
    return p;
  }
}
