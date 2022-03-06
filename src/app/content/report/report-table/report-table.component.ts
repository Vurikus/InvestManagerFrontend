import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Company} from "../../../model/company";
import {IReport, Report} from "../../../model/report";
import {ReportHeaderName} from "../../../model/reportHeaderName";
import {FormGroup} from "@angular/forms";
import {ReportType} from "../../../model/reportType";
import {Abbreviation, Currency, CurrencyInfo} from "../../../model/currencyInfo";
import {ReportService} from "../../../service/report.service";
import {ExchangeService} from "../../../service/exchange.service";
import {CompanyService} from "../../../service/company.service";
import {CurrencyService} from "../../../service/currency.service";

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  @Output()
  selectedCompany = new EventEmitter<Company>();
  currentCompanies: Array<Company> = [];
  searchCompanies: Array<Company> = [];
  configuratorOn = false;
  isEditReport = false;

  // reports: Array<IReport> = [];
  reports: Array<any> = [];
  currentReport: IReport;
  currentReportType: ReportType;
  currentCurrency: CurrencyInfo;

  currencies: ReadonlyArray<Currency> = [];
  abbreviations: ReadonlyArray<Abbreviation> = [];
  reportTypes: ReadonlyArray<ReportType> = [];

  constructor(private reportService: ReportService,
              private exchangeService: ExchangeService,
              private companyService: CompanyService) {
    this.currentReportType = ReportType.BALANCE_SHEET;
  }

  ngOnInit(): void {
    this.currencies = this.exchangeService.allowedCurrencies();
    this.abbreviations = this.exchangeService.getAbbreviations();
    this.reportTypes = Object.values(ReportType);
    this.currentCurrency = {currency: this.currencies[0], abbreviation: this.abbreviations[1]};
  }

  loadReport(): void {
    const tickers: string[] = this.currentCompanies.map(c => {
      return c.ticker;
    });
    if (tickers.length > 0) {
      this.reportService.getReports(tickers, this.currentReportType).subscribe((res: IReport[]) => {
        if (res.length > 0) {
          res.forEach(r => r.type = this.currentReportType);
          this.reports = this.reportService.recalculate(res, this.currentCurrency);
        }
      });
    }
  }

  selectCompany(company: Company): void {
    this.selectedCompany.emit(company);
    this.currentCompanies = [];
    this.addCompany(company);
    this.loadReport();
  }

  addCompany(company: Company): void {
    this.currentCompanies.push(company);
  }

  findCompaniesByTickerOrName(name: string): void {
    this.companyService.getCompaniesBySearch(name).subscribe(res => {
      this.searchCompanies = res;
    });
  }

  removeCompany(companyId: number): void {
    this.currentCompanies = this.currentCompanies.filter(company => company.id !== companyId);
  }

  changeReportType(type: string): void {
    this.currentReportType = type as ReportType;
    this.loadReport();
  }

  recalculate(): void {
    if (this.reports.length > 0) {
      console.log(this.reports);
      console.log(this.currentCurrency);
      this.reports = this.reportService.recalculate(this.reports, this.currentCurrency);
      console.log(this.reports);
    }
  }

  toggleConfiguration(): void {
    this.configuratorOn = !this.configuratorOn;
  }

  createReport(): void {
    this.currentReport = this.reportService.createEmptyReport(this.currentReportType, this.currentCompanies[0], this.currentCurrency);
    this.isEditReport = true;
  }

  editReport(report: Report): void {
    this.currentReport = report;
    this.currentReport.company = this.currentCompanies[0];
    this.isEditReport = true;
  }
}
