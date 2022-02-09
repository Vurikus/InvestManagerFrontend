import {Component, OnInit} from '@angular/core';
import {Report} from '../../../model/report';
import {IncomeStatement} from '../../../model/incomeStatement';
import {ReportHeaderName} from "../../../model/ReportHeaderName";
import {Abbreviation, Currency} from "../../../model/currencyInfo";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportList: Array<Report> = [];
  headerName: ReportHeaderName[];

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      const is = new IncomeStatement();
      is.id = i;
      is.date = new Date(2134781985 + i * 10000000000);
      is.revenue = 890 + i * 100;
      is.currencyInfo = {currency: Currency.RUR, abbreviation: Abbreviation.TS};
      is.costSales = 780 + i * 90;
      this.reportList.push(is);
    }
    this.headerName = this.reportList[0].getHeaders();
  }
}
