import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CompanyService} from '../../../service/company.service';
import {ICompany} from '../../../model/ICompany';
import {Sector} from '../../../model/sector';

@Component({
  selector: 'app-search-line',
  templateUrl: './company-search-line.component.html',
  styleUrls: ['./company-search-line.component.scss']
})
export class CompanySearchLineComponent implements OnInit {

  @Output()
  selectCompany = new EventEmitter<ICompany>();
  inputSearch: string;
  currentCompany: ICompany;
  showedCompanies: Array<ICompany> = [];
  allCompanies: Array<ICompany> = [];

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.showedCompanies = this.allCompanies;
  }

  select(company: ICompany): void {
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
