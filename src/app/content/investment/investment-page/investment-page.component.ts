import { Component, OnInit } from '@angular/core';
import {DealService} from "../../../service/deal.service";
import {IPosition, Position} from "../../../model/deal/position";
import {InstrumentType, SecurityType} from "../../../model/instrument";
import {SecurityService} from "../../../service/security.service";

@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.scss']
})
export class InvestmentPageComponent implements OnInit {

  title = 'Портфель';
  positions: Map<SecurityType, Array<Position>>;

  constructor(private dealService: DealService,
              public securityService: SecurityService) { }

  ngOnInit(): void {
    this.positions = this.dealService.getPositions();
    console.log(this.positions);
  }

  positionsByType(type: string | SecurityType): Array<Position>{
    return this.positions.get(type as SecurityType);
  }
}
