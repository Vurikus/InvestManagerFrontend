import {ICompany} from "../ICompany";
import {Security} from "../security";
import {IPositionEvent} from "./positionEvent";

export interface IPosition {
  id: number;
  security: Security;
  company: ICompany;
  openDate: Date;
  closeDate: Date;
  totalResult: number;
  totalCommission: number;
  price: number;
  volume: number;
  events: Array<IPositionEvent>;
}

export class Position implements IPosition{
  id: number;
  security: Security;
  company: ICompany;
  openDate: Date;
  closeDate: Date;
  totalResult: number;
  totalCommission: number;
  price: number;
  volume: number;
  events: Array<IPositionEvent>;

  constructor(p?: IPosition) {
    if (p){
      this.id = p.id;
      this.security = p.security;
      this.company = p.company;
      this.openDate = p.openDate;
      this.closeDate = p.closeDate;
      this.totalResult = p.totalResult;
      this.totalCommission = p.totalCommission;
      this.price = p.price;
      this.volume = p.volume;
      this.events = p.events;
    }
  }

  public setSecurity(s: Security): void{
    this.security = s;
  }

  public addEvent(price: number, volume: number, commission: number, buy: boolean): void{

  }
}
