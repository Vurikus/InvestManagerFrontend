import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IReport, Report} from '../../../model/report';
import {IncomeStatement} from '../../../model/incomeStatement';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {Abbreviation1, Currency, CurrencyInfo} from '../../../model/currencyInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportType} from '../../../model/reportType';
import {BalanceSheet} from '../../../model/balanceSheet';
import {ReportService} from '../../../service/report.service';
import {Company} from '../../../model/company';
import {ExchangeService} from '../../../service/exchange.service';
import {CurrencyService} from '../../../service/currency.service';
import {CompanyService} from '../../../service/company.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  @Output()
  selectedCompany = new EventEmitter<Company>();
  configuratorOn = false;
  isEditReport = false;
  reportList: Array<Report> = [];
  headerName: ReportHeaderName[];
  reportForm: FormGroup;
  currentReportType: ReportType;
  currentReport: Report;
  currentCurrency: CurrencyInfo;
  selectedCompanies: Array<Company> = [];
  searchCompanies: Array<Company> = [];
  currencies: ReadonlyArray<Currency> = [];
  abbreviations: ReadonlyArray<Abbreviation1> = [];
  reportTypes: ReadonlyArray<ReportType> = [];
  totalHeaderRow: Array<ReportHeaderName>;
  titleRow: Array<ReportHeaderName>;

  constructor(private reportService: ReportService,
              private exchangeService: ExchangeService,
              private companyService: CompanyService) {
    this.currentReportType = ReportType.BALANCE_SHEET;
  }

  ngOnInit(): void {
    this.currencies = this.exchangeService.allowedCurrencies();
    this.abbreviations = this.exchangeService.getAbbreviations();
    this.reportTypes = Object.values(ReportType);
    this.totalHeaderRow = ReportService.getTotalRows();
    this.titleRow = ReportService.getTitleRows();
    this.currentCurrency = {currency: this.currencies[0], abbreviation: this.abbreviations[1]};
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

  loadReport(): void {
    const tickers: string[] = this.selectedCompanies.map(c => {
      return c.ticker;
    });
    if (tickers.length > 0) {
      this.reportService.getReports(tickers, this.currentReportType).subscribe((res: IReport[]) => {
        if (res.length > 0) {
          console.log(res);
          const reports = ReportService.getReportObjectFromInterface(res, this.currentReportType);
          this.reportService.recalcReportsAfterChangeCurrency(reports, CurrencyService.clone(this.currentCurrency));
          this.reportList = reports;
        }
      });
    }
    this.headerName = ReportService.getReportHeaderNamesByType(this.currentReportType);
  }

  selectCompany(company: Company): void {
    this.selectedCompany.emit(company);
    this.selectedCompanies = [];
    this.addCompany(company);
    this.loadReport();
  }

  addCompany(company: Company): void {
    this.selectedCompanies.push(company);
  }

  findCompaniesByTickerOrName(name: string): void {
    this.companyService.getCompaniesBySearch(name).subscribe(res => {
      this.searchCompanies = res;
    });
  }

  removeCompany(companyId: number): void {
    this.selectedCompanies = this.selectedCompanies.filter(company => company.id !== companyId);
  }

  changeReportType(type: string): void {
    this.currentReportType = type as ReportType;
    this.loadReport();
  }

  recalculate(): void {
    this.reportService.recalcReportsAfterChangeCurrency(this.reportList, CurrencyService.clone(this.currentCurrency));
  }

  specialStyle(header: ReportHeaderName): string {
    if (this.totalHeaderRow.includes(header)) {
      return 'primary-column';
    } else if (this.titleRow.includes(header)) {
      return 'title-row warning';
    } else {
      return '';
    }
  }

  primaryColumnStyle(header: ReportHeaderName): string {
    if (this.titleRow.includes(header)) {
      return 'title-row';
    } else {
      return 'primary-column';
    }
  }

  toggleConfiguration(): void {
    this.configuratorOn = !this.configuratorOn;
  }

  createReport(): void {
    this.currentReport = ReportService.createEmptyReport(this.currentReportType, this.selectedCompanies[0]);
    this.isEditReport = true;
  }

  editReport(report: Report): void {
    this.currentReport = report;
    this.currentReport.company = this.selectedCompanies[0];
    this.isEditReport = true;
  }
}

