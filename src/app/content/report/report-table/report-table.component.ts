import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ICompany} from '../../../model/ICompany';
import {IReport, Report} from '../../../model/report/report';
import {ReportType} from '../../../model/report/reportType';
import {Abbreviation, Currency, CurrencyInfo} from '../../../model/currencyInfo';
import {ReportService} from '../../../service/report.service';
import {ExchangeService} from '../../../service/exchange.service';
import {CompanyService} from '../../../service/company.service';
import {BalanceSheet, IBalanceSheet} from '../../../model/report/balanceSheet';
import {IIncomeStatement, IncomeStatement} from "../../../model/report/incomeStatement";
import {IntervalDate} from "../../../model/intervalDate";

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss']
})
export class ReportTableComponent implements OnInit {

  @Output()
  selectedCompany = new EventEmitter<ICompany>();
  currentCompanies: Array<ICompany> = [];
  searchCompanies: Array<ICompany> = [];
  configuratorOn = false;
  isEditReport = false;

  reports: Array<any> = [];
  currentReport: Report;
  currentReportType: ReportType;
  currentCurrency: CurrencyInfo;
  currentIntervalDate: IntervalDate;

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
    this.currentIntervalDate = IntervalDate.newInstance();
  }

  loadReport(): void {
    this.reports = [];
    const tickers: string[] = this.currentCompanies.map(c => {
      return c.ticker;
    });
    if (tickers.length > 0) {
      this.reportService.getReports(tickers, this.currentReportType, this.currentIntervalDate).subscribe((res: IReport[]) => {
        if (res.length > 0) {
          this.reports = res.map(r => {
            r.type = this.currentReportType;
            let report;
            if (r.type === ReportType.BALANCE_SHEET) { report = new BalanceSheet(r.company, r as IBalanceSheet); }
            else if (r.type === ReportType.INCOME_STATEMENT) { report = new IncomeStatement(r.company, r as IIncomeStatement); }
            report.setCurrency(this.currentCurrency);
            return report;
          });
        }
      });
    }
  }

  selectCompany(company: ICompany): void {
    this.selectedCompany.emit(company);
    this.currentCompanies = [];
    this.addCompany(company);
    this.loadReport();
  }

  addCompany(company: ICompany): void {
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
    this.currentReport = this.reportService.createEmptyReport(this.currentReportType, this.currentCompanies[0], this.currentCurrency);
    this.loadReport();
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

  changeCurrencyInfo(): void {
    if (this.reports.length > 0) {
      this.reports.forEach(r => r.setCurrency(this.currentCurrency));
    }
  }
}
