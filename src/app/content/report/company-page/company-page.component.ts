import {Component, OnInit} from '@angular/core';
import {CompanyService} from "../../../service/company.service";
import {ICompany} from '../../../model/ICompany';
import {Sector} from "../../../model/sector";

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {

  companies: ICompany[];
  currentCompany: ICompany;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.fillCompanies();
  }

  private fillCompanies(): void{
    this.companyService.getCompanies().subscribe((data) => {
      console.log(data);
      this.companies = data;
      this.currentCompany = this.companies[0];
      console.log(this.currentCompany.sector);
    });
  }

  sectorName(): string {
    return Sector[this.currentCompany.sector];
  }
}
