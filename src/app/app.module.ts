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
import {ReportListComponent} from './content/report/report-list/report-list.component';
import {ReportGraphComponent} from './content/report/report-graph/report-graph.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { CompanySearchLineComponent } from './content/common/search-line/company-search-line.component';
import { ReportFormComponent } from './content/report/report-form/report-form.component';
import { ReportTableComponent } from './content/report/report-table/report-table.component';

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
    ReportListComponent,
    ReportGraphComponent,
    CompanySearchLineComponent,
    ReportFormComponent,
    ReportTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
