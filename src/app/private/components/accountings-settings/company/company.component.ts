import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/private/http/accounting-settings/company.service';

@Component({
  selector: 'template-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAllRoles().subscribe((response) => {
      console.log(response);
    });
  }
}
