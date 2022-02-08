import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit {

  searchPanelOn: boolean;

  constructor() { }

  ngOnInit(): void {
    this.searchPanelOn = true;
  }
}
