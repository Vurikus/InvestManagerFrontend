import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportPageComponent } from './content/report-page/report-page.component';
import { ReportService } from './service/report.service';
import {HttpClientModule} from '@angular/common/http';
import { CompanyPageComponent } from './content/company-page/company-page.component';
import { HeaderComponent } from './header/header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ContentPageComponent } from './content/content-page/content-page.component';
import { MainMenuComponent } from './layout/main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportPageComponent,
    CompanyPageComponent,
    HeaderComponent,
    MainPageComponent,
    ContentPageComponent,
    MainMenuComponent
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
