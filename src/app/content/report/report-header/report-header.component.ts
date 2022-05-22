import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from '../../../service/company.service';
import {ICompany} from '../../../model/ICompany';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent implements OnInit {

  @Input()
  currentCompany: ICompany;
  searchPanelOn: boolean;
  inputSearch: string;
  companies: ICompany[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.searchPanelOn = true;
  }

  sendSearch(): void {
    this.companyService.getCompaniesBySearch(this.inputSearch).subscribe(res => {
      this.companies = res;
    });
  }
}
