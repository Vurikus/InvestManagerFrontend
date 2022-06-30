import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DealService} from "../../../service/deal.service";
import {IPosition, Position} from "../../../model/deal/position";
import {SecurityDisplayType, SecurityType} from "../../../model/ISecurity";
import {SecurityService} from "../../../service/security.service";
import {DialogService} from "../../../service/dialog.service";

@Component({
  selector: 'app-investment-page',
  templateUrl: './investment-page.component.html',
  styleUrls: ['./investment-page.component.scss']
})
export class InvestmentPageComponent implements OnInit {

  title = 'Портфель';
  selectedPosition: Position;
  positions: Map<SecurityType, Array<Position>>;
  size = 6;

  constructor(private dealService: DealService,
              public securityService: SecurityService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  positionsByType(type: string | SecurityType): Array<Position> {
    return this.positions.get(type as SecurityType);
  }

  createPosition(): void {
    this.selectedPosition = null;
    this.changeVisibleDialog();
  }

  editPosition(p: Position): void {
    this.selectedPosition = p;
    this.changeVisibleDialog();
  }

  private changeVisibleDialog(): void {
    this.dialogService.changeVisible();
  }

  private loadData(): void {
    this.positions = this.dealService.getPositions();
  }

  updatePosition(p: Position): void {
    this.selectedPosition = null;
    this.loadData();
  }
}
