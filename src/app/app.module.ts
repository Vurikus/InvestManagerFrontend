import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportPageComponent } from './content/report/report-page/report-page.component';
import { ReportService } from './service/report.service';
import {HttpClientModule} from '@angular/common/http';
import { CompanyPageComponent } from './content/report/company-page/company-page.component';
import { HeaderComponent } from './header/header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainMenuComponent } from './layout/main-menu/main-menu.component';
import { InvestmentPageComponent } from './content/investment/investment-page/investment-page.component';
import { StatisticPageComponent } from './content/statistic/statistic-page/statistic-page.component';
import { MarketPageComponent } from './content/market/market-page/market-page.component';
import { ReportHeaderComponent } from './content/report/report-header/report-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportPageComponent,
    CompanyPageComponent,
    HeaderComponent,
    MainPageComponent,
    MainMenuComponent,
    InvestmentPageComponent,
    StatisticPageComponent,
    MarketPageComponent,
    ReportHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
