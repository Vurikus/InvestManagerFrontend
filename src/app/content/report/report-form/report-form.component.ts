import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ReportType} from '../../../model/reportType';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportService} from '../../../service/report.service';
import {CurrencyInfo} from '../../../model/currencyInfo';
import {Report} from '../../../model/report';

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
  }

  saveReport(): void {
    const report = this.currentReport as Report;
    report.calculateTotal();
    this.reportService.sendReport(report);
    this.onSave.emit(true);
  }
}
