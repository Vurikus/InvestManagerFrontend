import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../service/report.service';
import {Report} from '../../../model/report';
import {ReportType} from '../../../model/reportType';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  rows: string[];
  reports: Report[];
  ticker: string;
  reportType: ReportType = ReportType.INCOME_STATEMENT;

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
    const n = 15;
    this.rows = new Array(n);
    for (let i = 0; i < n; i++) {
      this.rows[i] = `${i}`;
    }
    this.constructRows();
  }

  constructRows(): void {
    this.ticker = 'GAZP';
    this.reportService.getReports(this.ticker, this.reportType).subscribe((data) => {
      console.log(data);
      this.reports = data;
    });
  }
}
