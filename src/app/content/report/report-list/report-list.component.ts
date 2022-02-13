import {Component, OnInit} from '@angular/core';
import {Report} from '../../../model/report';
import {IncomeStatement} from '../../../model/incomeStatement';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {Abbreviation, Currency, CurrencyInfo} from '../../../model/currencyInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportType} from '../../../model/reportType';
import {BalanceSheet} from '../../../model/balanceSheet';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  reportList: Array<Report> = [];
  headerName: ReportHeaderName[];
  reportForm: FormGroup;
  currentReportType: ReportType;
  currentCurrency: CurrencyInfo = {currency: Currency.RUR, abbreviation: Abbreviation.MLN};
  currentReport: Report;
  totalHeaderRow: Array<ReportHeaderName> = [
    ReportHeaderName.crossProfit,
    ReportHeaderName.netProfit,
    ReportHeaderName.operatingProfit,
  ];

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
    this.currentReportType = ReportType.INCOME_STATEMENT;
    this.headerName = this.reportList[0].getHeaders();
    this.createFormGroup(this.currentReportType);
  }

  createFormGroup(type: ReportType): void {
    let headers: ReportHeaderName[];
    if (type === ReportType.BALANCE_SHEET) {
      headers = BalanceSheet.getHeadersStatic();
    } else if (type === ReportType.INCOME_STATEMENT) {
      headers = IncomeStatement.getHeadersStatic();
    } else {
      throw new Error(`Illegal report type: ${type}`);
    }
    const group = {};
    headers.forEach(rhn => {
      group[rhn] = new FormControl('');
    });
    this.reportForm = new FormGroup(group);
    console.log(this.reportForm);
  }

  isTotalRow(header: ReportHeaderName): boolean {
    return this.totalHeaderRow.includes(header);
  }
}

