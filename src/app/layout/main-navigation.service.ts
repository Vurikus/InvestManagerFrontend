import {Injectable} from '@angular/core';
import {NavButton} from './model/navButton';

@Injectable({
  providedIn: 'root'
})
export class MainNavigationService {

  nav: NavButton[];

  constructor() {
    this.nav = [
      {
        title: 'Портфель',
        icon: 'private',
        router: '/investment',
        description: 'Аналитика открытых сделок по всем счетам'
      },
      {
        title: 'Статистика',
        icon: 'md-business',
        router: '/statistic',
        description: 'Статистика всех сделок по всем счетам'
      },
      {
        title: 'Отчетность компаний',
        icon: 'md-business',
        router: '/report',
        description: 'Детальная информация по отчетностям компаний'
      },
      {
        title: 'Анализ рынка',
        icon: 'md-business',
        router: '/market',
        description: 'Табличный сводный анализ по рынку с мультипликаторами'
      },
      {
        title: 'Планирование',
        icon: 'md-business',
        router: '/',
        description: 'Модуль в разработке'
      }
    ];
  }

  getNav(): NavButton[] {
    return this.nav;
  }
}
