import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ReportType} from '../../../model/reportType';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {BalanceSheet} from '../../../model/balanceSheet';
import {IncomeStatement} from '../../../model/incomeStatement';
import {FormControl, FormGroup} from '@angular/forms';
import {Report} from '../../../model/report';
import {ReportService} from '../../../service/report.service';

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
  @Input()
  currentReport: Report;

  constructor(private reportService: ReportService) {
  }

  ngOnChanges(): void {
    console.log('CHANGES');
    this.createFormGroup();
  }

  createFormGroup(): void {
    if (this.type === ReportType.BALANCE_SHEET) {
      this.headers = BalanceSheet.getHeadersStatic();
      if (!this.currentReport) {
        this.currentReport = new BalanceSheet();
      }
    } else if (this.type === ReportType.INCOME_STATEMENT) {
      this.headers = IncomeStatement.getHeadersStatic();
      if (!this.currentReport) {
        this.currentReport = new IncomeStatement();
      }
    } else {
      throw new Error(`Illegal report type: ${this.type}`);
    }
    const group = {['Дата']: new FormControl('')};
    this.headers.forEach(rhn => {
      console.log(this.currentReport.getValueByHeaderName(rhn));
      group[rhn] = new FormControl(this.currentReport.getValueByHeaderName(rhn));
    });
    this.reportForm = new FormGroup(group);
  }

  saveReport(): void {
    this.headers.forEach(h => {
      this.reportForm.get(h);
    });
    this.reportService.sendReport(this.currentReport);
  }
}
