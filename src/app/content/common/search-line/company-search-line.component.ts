import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompanyService} from '../../../service/company.service';
import {Company} from '../../../model/company';
import {Sector} from '../../../model/sector';

@Component({
  selector: 'app-search-line',
  templateUrl: './company-search-line.component.html',
  styleUrls: ['./company-search-line.component.scss']
})
export class CompanySearchLineComponent implements OnInit {

  @Output()
  selectCompany = new EventEmitter<Company>();
  inputSearch: string;
  currentCompany: Company;
  showedCompanies: Array<Company> = [];
  allCompanies: Array<Company> = [];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.showedCompanies = this.allCompanies;
  }

  select(company: Company): void {
    this.currentCompany = company;
    this.inputSearch = company.organisationName;
    this.selectCompany.emit(company);
  }

  sendLine(): void {
    this.companyService.getCompaniesBySearch(this.inputSearch).subscribe(res => {
      this.showedCompanies = res;
    });
  }
}
