import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReportPageComponent} from './content/report/report-page/report-page.component';
import {ReportService} from './service/report.service';
import {HttpClientModule} from '@angular/common/http';
import {CompanyPageComponent} from './content/report/company-page/company-page.component';
import {MainMenuComponent} from './layout/main-menu/main-menu.component';
import {InvestmentPageComponent} from './content/investment/investment-page/investment-page.component';
import {StatisticPageComponent} from './content/statistic/statistic-page/statistic-page.component';
import {MarketPageComponent} from './content/market/market-page/market-page.component';
import {ReportHeaderComponent} from './content/report/report-header/report-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReportGraphComponent} from './content/report/report-graph/report-graph.component';
import { CompanySearchLineComponent } from './content/common/search-line/company-search-line.component';
import { ReportFormComponent } from './content/report/report-form/report-form.component';
import { ReportTableComponent } from './content/report/report-table/report-table.component';
import { NegativeReportCurrencyPipe } from './content/common/negative-report-currency.pipe';
import { HeaderComponent } from './content/common/header/header.component';
import { DialogPositionComponent } from './content/investment/dialog-position/dialog-position.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportPageComponent,
    CompanyPageComponent,
    MainMenuComponent,
    InvestmentPageComponent,
    StatisticPageComponent,
    MarketPageComponent,
    ReportHeaderComponent,
    ReportGraphComponent,
    CompanySearchLineComponent,
    ReportFormComponent,
    ReportTableComponent,
    NegativeReportCurrencyPipe,
    HeaderComponent,
    DialogPositionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
