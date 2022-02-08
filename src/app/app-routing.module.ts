import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainMenuComponent} from './layout/main-menu/main-menu.component';
import {InvestmentPageComponent} from './content/investment/investment-page/investment-page.component';
import {StatisticPageComponent} from './content/statistic/statistic-page/statistic-page.component';
import {ReportPageComponent} from './content/report/report-page/report-page.component';
import {MarketPageComponent} from './content/market/market-page/market-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    data: { title: 'Меню' }
  },
  {
    path: 'investment',
    component: InvestmentPageComponent,
    data: { title: 'Портфель' }
  },
  {
    path: 'statistic',
    component: StatisticPageComponent,
    data: { title: 'Статистика' }
  },
  {
    path: 'report',
    component: ReportPageComponent,
    data: { title: 'Отчетность' }
  },
  {
    path: 'market',
    component: MarketPageComponent,
    data: { title: 'Анализ рынка' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
