import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  
  constructor(private router: Router,private _Activatedroute:ActivatedRoute,private getDataservice: GetDataService) { }
  companyId;
  companyDetails;
  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.companyId = params.get('id'); 
      });

      this.getDataservice.getOneCompany(this.companyId)
      .subscribe(
        data => {
                this.companyDetails = data;
        },
        error => {
            console.log(error)
        }
      )
  }
 
  goToBuyPage()
  {
    this.router.navigate(['buy',this.companyId])
  }





 
}
