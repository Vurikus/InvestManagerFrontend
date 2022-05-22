import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportService} from '../../../service/report.service';
import {Report} from '../../../model/report/report';
import {ReportType} from '../../../model/report/reportType';
import {ICompany} from '../../../model/ICompany';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  currentCompany: ICompany;
  @Output()
  selectedCompany = new EventEmitter<ICompany>();
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

  selectCompany(company: ICompany): void{
    this.selectedCompany.emit(company);
    this.currentCompany = company;
  }

  constructRows(): void {
    this.ticker = 'GAZP';
    // this.reportService.getReports(this.ticker, this.reportType).subscribe((data) => {
    //   console.log(data);
    //   this.reports = data;
    // });
  }
}
