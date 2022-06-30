import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogService} from "../../../service/dialog.service";
import {IPosition, Position} from "../../../model/deal/position";
import {DealService} from "../../../service/deal.service";
import {IPositionEvent} from "../../../model/deal/positionEvent";
import {SecurityService} from "../../../service/security.service";
import {ISecurity, ISecurityByType, Security, SecurityDisplayType, SecurityType} from "../../../model/ISecurity";
import {ExchangeService} from "../../../service/exchange.service";
import {stringify} from "@angular/compiler/src/util";
import {ICompany} from "../../../model/ICompany";

@Component({
  selector: 'app-dialog-position',
  templateUrl: './dialog-position.component.html',
  styleUrls: ['./dialog-position.component.scss']
})
export class DialogPositionComponent implements OnInit {
  @Input()
  position: Position;
  searchSecurityLine = '';
  currentSecurityType: SecurityDisplayType;
  @Output()
  updatedPosition = new EventEmitter<Position>();
  event: IPositionEvent;
  securities: Array<Security>;
  originSecurities: Array<Security>;

  constructor(private dialogService: DialogService,
              private dealService: DealService,
              public securityService: SecurityService,
              public exchangeService: ExchangeService) {}

  ngOnInit(): void {
    if (!this.position) {
      this.position = new Position();
      this.securities = [];
      this.changeSecurityType(this.position.security.type);
    } else {
      this.securities = [this.position.security];
      this.currentSecurityType = this.position.security.displayType;
      this.setSecurity(this.position.security);
    }
    this.event = {date: new Date(), price: 0, volume: 0, commission: 0, buy: true};
  }

  savePosition(): void{
    console.log(this.position);
    console.log(this.event);
    this.dealService.addEvent(this.position, this.event).subscribe( (res: IPosition) => {
      const p = this.dealService.convertInputPosition(res);
      this.updatedPosition.emit(p);
      this.close();
    });
  }

  close(): void{
    this.position = null;
    this.event = null;
    this.securities = null;
    this.dialogService.changeVisible();
  }

  changeSecurityType(type: SecurityType): void {
    this.searchSecurityLine = '';
    this.currentSecurityType = this.securityService.getSecurityTypes().find(s => s.type === type);
    this.position.currency = ExchangeService.defaultCurrency();
    this.securityService.getSecurities([type]).subscribe((res: ISecurityByType) => {
      let securities: Array<ISecurity>;
      if (res.stock) { securities = res.stock; }
      else if (res.bond) { securities = res.bond; }
      else if (res.etf) { securities = res.etf; }
      else {
        return;
      }
      this.securities = securities.map(isecurity => {
        const currency = this.exchangeService.getCurrencyByCode(isecurity.currencyCode);
        return new Security(isecurity, currency);
      });
      this.originSecurities = this.securities;
    });
  }

  setSecurity(security: Security): void {
    this.position.security = security;
    this.position.currency = security.currency;
    this.searchSecurityLine = security.name;
  }

  findSecurity(): void {
    this.securities = this.originSecurities.filter(s => {
      if (s.ticker.startsWith(this.searchSecurityLine) ||
        s.name.includes(this.searchSecurityLine) ||
        s.isin.startsWith(this.searchSecurityLine)) { return s; }
    });
    console.log(this.securities.length);
  }
}
