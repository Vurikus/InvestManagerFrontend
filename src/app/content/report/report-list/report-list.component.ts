import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Report} from '../../../model/report';
import {IncomeStatement} from '../../../model/incomeStatement';
import {ReportHeaderName} from '../../../model/reportHeaderName';
import {Abbreviation, Currency, CurrencyInfo} from '../../../model/currencyInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {ReportType} from '../../../model/reportType';
import {BalanceSheet} from '../../../model/balanceSheet';
import {ReportService} from '../../../service/report.service';
import {Company} from '../../../model/company';
import {ExchangeService} from '../../../service/exchange.service';
import {CurrencyService} from '../../../service/currency.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit, OnChanges {

  reportList: Array<Report> = [];
  headerName: ReportHeaderName[];
  reportForm: FormGroup;
  currentReportType: ReportType;
  currentCurrency: CurrencyInfo;
  companies: Array<Company> = [];
  currencies: Array<Currency> = [];
  totalHeaderRow: Array<ReportHeaderName> = [
    ReportHeaderName.crossProfit,
    ReportHeaderName.netProfit,
    ReportHeaderName.operatingProfit,
  ];

  constructor(private reportService: ReportService, private exchangeService: ExchangeService) {
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
    this.currentCurrency = {currency: this.currencies[0], abbreviation: Abbreviation.MLN};
    this.loadReport();
    console.log('NG INIT');
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
    const tickers: string[] = this.companies.map(c => {
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
        // is.setCurrency(this.currentCurrency);
        reports.push(is);
      }
    }
    this.reportList = reports;
    this.recalculate();
    this.headerName = reports[0].getHeaders();
  }

  changeReportType(type: string): void {
    this.currentReportType = type as ReportType;
    this.loadReport();
  }

  recalculate(): void {
    this.reportService.recalcReportsAfterChangeCurrency(this.reportList, CurrencyService.clone(this.currentCurrency));
  }

  isTotalRow(header: ReportHeaderName): boolean {
    return this.totalHeaderRow.includes(header);
  }
}

