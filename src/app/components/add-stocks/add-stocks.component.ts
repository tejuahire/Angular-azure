import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/company-model';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-add-stocks',
  templateUrl: './add-stocks.component.html',
  styleUrls: ['./add-stocks.component.css']
})
export class AddStocksComponent implements OnInit {

  company: CompanyModel = new CompanyModel();
  constructor(private getDataService: GetDataService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.saveCompany();
   
  }

  saveCompany() {
    console.log('working' + this.company.name);
    this.getDataService.addCompany(this.company).subscribe(data => {
      if (data.status === 'success') {
        this.route.navigate(['admin']);
      }else{
        console.log(data+"not working");
        
      }
    }

    )
  }
}
