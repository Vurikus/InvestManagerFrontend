import {ICompany} from "../ICompany";
import {ISecurity, Security} from "../ISecurity";
import {IPositionEvent} from "./positionEvent";
import {Currency, CurrencyInfo} from "../currencyInfo";

export interface IPosition {
  id: number;
  security: ISecurity;
  company: ICompany;
  openDate: Date;
  closeDate: Date;
  totalResult: number;
  totalCommission: number;
  buyPrice: number;
  actualPrice: number;
  currencyCode?: string;
  profit: number;
  profitPercent: number;
  share: number;
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
  buyPrice: number;
  sumBuyPrice: number;
  actualPrice: number;
  sumActualPrice: number;
  profit: number;
  profitPercent: number;
  share: number;
  currency: Currency;
  volume: number;
  events: Array<IPositionEvent> = [];

  constructor() {
    this.openDate = new Date();
    this.security = new Security();
    this.currency = this.security.currency;
  }

  public addEvent(event: IPositionEvent): void{
    this.events.push(event);
  }

  public isNew(): boolean{
    return this.id === null || this.id === undefined;
  }
}
