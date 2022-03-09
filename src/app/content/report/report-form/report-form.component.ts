import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ReportType} from '../../../model/reportType';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {BalanceSheet} from '../../../model/balanceSheet';
import {IncomeStatement} from '../../../model/incomeStatement';
import {FormControl, FormGroup} from '@angular/forms';
import {IReport, Report} from '../../../model/report';
import {ReportService} from '../../../service/report.service';
import {CurrencyInfo} from '../../../model/currencyInfo';

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
  currentReport: any;
  @Input()
  currentCurrency: CurrencyInfo;
  @Output()
  onSave = new EventEmitter<boolean>();

  constructor(private reportService: ReportService) {
  }

  ngOnChanges(): void {
    console.log('CHANGES');
    this.createFormGroup();
  }

  createFormGroup(): void {
    if (this.type === ReportType.INCOME_STATEMENT) {
      this.reportForm = new FormGroup({
        date: new FormControl(),
        revenue: new FormControl(),
        costSales: new FormControl()
      });


      // this.headers = BalanceSheet.getHeadersStatic();
      // if (!this.currentReport || this.currentReport.type !== this.type) {
      //   this.currentReport = new BalanceSheet();
      // }
    // } else if (this.type === ReportType.INCOME_STATEMENT) {
    //   this.headers = [
    //     ReportHeaderName.revenue,
    //     ReportHeaderName.costSales,
    //     ReportHeaderName.sellingAndMarketingCost,
    //     ReportHeaderName.administrativeExpenses,
    //     ReportHeaderName.otherIncome,
    //     ReportHeaderName.otherLosses,
    //     ReportHeaderName.financeIncome,
    //     ReportHeaderName.financeCosts,
    //     ReportHeaderName.exchangeTransaction,
    //     ReportHeaderName.incomeTax,
    //     ReportHeaderName.nonControlInterests,
    //     ReportHeaderName.countStocks
    //   ];
      // IncomeStatement.getHeadersStatic();
      // if (!this.currentReport || this.currentReport.type !== this.type) {
      //   this.currentReport = new IncomeStatement();
      // }
    } else {
      throw new Error(`Illegal report type: ${this.type}`);
    }
    // this.currentReport.setCurrency(this.currentCurrency);
    // const group = {['Дата']: new FormControl(this.currentReport.getValueByHeaderName('Дата'))};
    // this.headers.forEach(rhn => {
    //   group[rhn] = new FormControl(null);
    //   group[rhn] = new FormControl(this.currentReport.getValueByHeaderName(rhn));
    // });
    // this.reportForm = new FormGroup(group);
  }

  saveReport(): void {
    // for (const controlsKey in this.reportForm.controls) {
    //   const value = this.reportForm.get(controlsKey).value;
    //   this.currentReport.setValueByHeaderName(controlsKey, value);
    // }
    // console.log(this.currentReport);
    // this.reportService.sendReport(this.currentReport);
    // this.onSave.emit(true);
  }
}
