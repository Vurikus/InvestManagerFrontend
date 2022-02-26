import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Report} from '../../../model/report';
import {IncomeStatement} from '../../../model/incomeStatement';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {Abbreviation, Currency, CurrencyInfo} from '../../../model/currencyInfo';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ReportType} from '../../../model/reportType';
import {BalanceSheet} from '../../../model/balanceSheet';
import {ReportService} from '../../../service/report.service';
import {Company} from '../../../model/company';
import {ExchangeService} from '../../../service/exchange.service';
import {CurrencyService} from '../../../service/currency.service';
import {CompanyService} from '../../../service/company.service';
import {Sector} from "../../../model/sector";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit, OnChanges {

  @Output()
  selectedCompany = new EventEmitter<Company>();
  configuratorOn = false;
  reportList: Array<Report> = [];
  headerName: ReportHeaderName[];
  reportForm: FormGroup;
  currentReportType: ReportType;
  currentCurrency: CurrencyInfo;
  selectedCompanies: Array<Company> = [];
  searchCompanies: Array<Company> = [];
  currencies: Array<Currency> = [];
  abbreviations: Array<Abbreviation> = [];
  reportTypes: Array<ReportType> = [];
  totalHeaderRow: Array<ReportHeaderName>;
  titleRow: Array<ReportHeaderName>;
  companyForm: FormGroup;

  constructor(private reportService: ReportService,
              private exchangeService: ExchangeService,
              private companyService: CompanyService,
              private fb: FormBuilder) {
    this.currentReportType = ReportType.BALANCE_SHEET;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.currentReportType === ReportType.INCOME_STATEMENT) {
    //   for (let i = 0; i < 3; i++) {
    //     const is = new IncomeStatement();
    //     is.id = i;
    //     is.date = new Date(2134781985 + i * 10000000000);
    //     is.revenue = 890 + i * 100;
    //     is.currencyInfo = {currency: this.currencies[0], abbreviation: Abbreviation.TS};
    //     is.costSales = 780 + i * 90;
    //     this.reportList.push(is);
    //   }
    // } else {
    //   for (let i = 0; i < 3; i++) {
    //     const is = new BalanceSheet();
    //     is.id = i;
    //     is.date = new Date(2134781985 + i * 10000000000);
    //     is.currencyInfo = {currency: this.currencies[0], abbreviation: Abbreviation.TS};
    //     this.reportList.push(is);
    //   }
    // }
    // this.headerName = this.reportList[0].getHeaders();
  }

  ngOnInit(): void {
    this.currencies = this.exchangeService.allowedCurrencies();
    this.abbreviations = Object.values(Abbreviation);
    this.reportTypes = Object.values(ReportType);
    this.totalHeaderRow = ReportService.getTotalRows();
    this.titleRow = ReportService.getTitleRows();
    this.currentCurrency = {currency: this.currencies[0], abbreviation: Abbreviation.TS};
    // this.loadReport();
    // for (let i = 1; i < 10; i++){
    //   this.searchCompanies.push({id: i, ticker: i + 'ATT', organisationName: 'Att', country: 'USA', exchange: '', sector: Sector.COMMUNICATION, headquartersCountry: ''});
    // }
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
    this.reportService.getReports(tickers, this.currentReportType).subscribe((res: Report[]) => {
      this.reportService.recalcReportsAfterChangeCurrency(res, CurrencyService.clone(this.currentCurrency));
      this.reportList = res;
      this.headerName = res[0].getHeaders();
    });
    const reports = [];
    if (this.currentReportType === ReportType.INCOME_STATEMENT) {
      for (let i = 0; i < 3; i++) {
        const is = new IncomeStatement();
        is.id = i;
        is.date = new Date(2134781985 + i * 10000000000);
        is.revenue = 890 + i * 100;
        is.costSales = 780 + i * 90;
        reports.push(is);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const is = new BalanceSheet();
        is.id = i;
        is.date = new Date(2134781985 + i * 10000000000);
        is.nc_fixedAssets = 2309 * i;
        // is.setCurrency(this.currentCurrency);
        reports.push(is);
      }
    }
    this.reportList = reports;
    this.recalculate();
    this.headerName = reports[0].getHeaders();
  }

  selectCompany(company: Company): void{
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
    if (this.totalHeaderRow.includes(header)) { return 'primary-column'; }
    else if (this.titleRow.includes(header)) {
      return 'title-row warning';
    } else { return ''; }
  }

  primaryColumnStyle(header: ReportHeaderName): string {
    if (this.titleRow.includes(header)) { return 'title-row'; }
    else { return 'primary-column'; }
  }

  toggleConfiguration(): void {
    this.configuratorOn = ! this.configuratorOn;
  }
}

