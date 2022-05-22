import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPosition, Position} from "../model/deal/position";
import {environment} from "../../environments/environment";
import {IPositionEvent} from "../model/deal/positionEvent";
import {stringify} from "@angular/compiler/src/util";
import {InstrumentType, SecurityType} from "../model/instrument";
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class DealService {

  constructor(private http: HttpClient) { }

  public addEvent(position: Position, event?: IPositionEvent): Position{
    if (position.id){
      this.http.post<Position>(`${environment.apiUrl}/position/${position.id}/event`, event).subscribe(res => position = res);
    } else {
      this.http.post<Position>(`${environment.apiUrl}/position`, position).subscribe(res => position = res);
    }
    return position;
  }

  public getPositions(): Map<SecurityType, Array<Position>>{
    const result = SecurityService.getSecurityTypeEmptyPositionMap();
    this.http.get<Array<Position>>(`${environment.apiUrl}/position`).subscribe((res: IPosition[]) => {
      for (let i = 0; i < res.length; i++) {
        // const type = res[i].security.type;
        const type = SecurityType.STOCK;
        const positions = result.get(type);
        if (!positions) { continue; }
        const p = new Position(res[i]);
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
}
