import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogService} from "../../../service/dialog.service";
import {IPosition, Position} from "../../../model/deal/position";
import {DealService} from "../../../service/deal.service";
import {IPositionEvent} from "../../../model/deal/positionEvent";
import {SecurityService} from "../../../service/security.service";
import {ISecurity, Security, SecurityDisplayType, SecurityType} from "../../../model/ISecurity";
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
  @Output()
  updatedPosition = new EventEmitter<Position>();
  event: IPositionEvent;
  securities: Array<ISecurity>;
  securityType: SecurityDisplayType;

  constructor(private dialogService: DialogService,
              private dealService: DealService,
              public securityService: SecurityService,
              public exchangeService: ExchangeService) { }

  ngOnInit(): void {
    if (!this.position) {
      // this.securities = this.securityService.getSecurities();
      // this.securities = [{name: 'GAZP', exchange: 'MOEX', id: null, type: SecurityType.STOCK, sector: null, ticker: 'GAZP', isin: 'RU34627'},
      //   {name: 'GAZP2', exchange: 'MOEX', id: null, type: SecurityType.STOCK, sector: null, ticker: 'GAZP', isin: 'RU34627'}];
      this.position = new Position();
    } else {
      this.securities = [this.position.security];
    }
    this.event = {date: new Date(), price: 0, volume: 0, commission: 0, buy: true};
    this.securityType = this.position.security.displayType;
    console.log('dialog init: ' + this.position.id + ' ' + this.position.isNew());
    console.log('dialog init: ' + this.event);
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

  changeSecurityType(type: any): void{
    this.securityService.getSecurities([type]).subscribe(res => {
      const securities1 = res.map(isecurity => new Security(isecurity));
      this.securities = securities1;
    });
}

}
