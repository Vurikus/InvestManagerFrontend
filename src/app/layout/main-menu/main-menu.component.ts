import { Component, OnInit } from '@angular/core';
import {MainNavigationService} from '../main-navigation.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  data;
  isSidebarShown: boolean;

  constructor(private navService: MainNavigationService) {
    this.data = this.navService.getNav();
    this.isSidebarShown = true;
  }
}
