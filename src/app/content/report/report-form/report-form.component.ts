import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ReportType} from '../../../model/reportType';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {BalanceSheet} from '../../../model/balanceSheet';
import {IncomeStatement} from '../../../model/incomeStatement';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnChanges {
  @Input()
  type: ReportType;
  reportForm: FormGroup;
  headers: ReportHeaderName[];

  constructor() {
  }

  ngOnChanges(): void {
    console.log('CHANGES');
    this.createFormGroup();
  }

  createFormGroup(): void {
    if (this.type === ReportType.BALANCE_SHEET) {
      this.headers = BalanceSheet.getHeadersStatic();
    } else if (this.type === ReportType.INCOME_STATEMENT) {
      this.headers = IncomeStatement.getHeadersStatic();
    } else {
      throw new Error(`Illegal report type: ${this.type}`);
    }
    const group = {};
    this.headers.forEach(rhn => {
      group[rhn] = new FormControl('');
    });
    this.reportForm = new FormGroup(group);
  }

  saveReport() {
  }
}
