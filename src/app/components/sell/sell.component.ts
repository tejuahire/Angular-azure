import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  quantity = '';
  companyDetails;
  companyId;
  price:number;
  data:number=Math.floor(Math.random() * 20);
  constructor(private router: Router, private getDataservice: GetDataService, private _Activatedroute:ActivatedRoute) { }


  ngOnInit() {
    
    const obs$=interval(1000);
    obs$.subscribe((d)=>{
        this.data=this.getDataservice.dostuff(this.data,this.price);
    });

    
    this._Activatedroute.paramMap.subscribe(params => { 
      this.companyId = params.get('id'); 
      });

      this.getDataservice.getMyShares(localStorage.getItem('username'))
      .subscribe(
        data => {
            for(let i=0;i<data.length;i++)
            {
              if(data[i].company_id==this.companyId)
              {
                this.companyDetails = data[i];
                this.price=this.companyDetails.current_rate;
              }
            }
            
        },
        error => {
            console.log(error)
        }
      )
  }
 
  sellItem()
  {
    console.log(this.data);
    this.getDataservice.sellShare(localStorage.getItem('username'), this.companyId, this.quantity,this.data)
      .subscribe(
        data => {
            if(data.status=="success")
              this.router.navigate(['my-shares'])
        },
        error => {
            console.log(error)
        }
      )
  }
  checkQuantity(qty,availableQty)
  {
    if(isNaN(Number(qty.value)) || Number(qty.value) === 0 || Number(qty.value) > availableQty)
      return false;
    else
      return true;
  }
}
