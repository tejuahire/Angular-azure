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

  quantity:number=0 ;
  companyDetails;
  companyId;
  max_price:number;
  min_price:number;
  amount:number;
  data:number;
  constructor(private router: Router, private getDataservice: GetDataService, private _Activatedroute:ActivatedRoute) { }


  ngOnInit() {
    
    const obs$=interval(1000);
    obs$.subscribe((d)=>{
        console.log(this.max_price);
        console.log(this.min_price);
        this.data=this.getDataservice.dostuff(this.max_price,this.min_price);
        this.getAmount(this.data,this.quantity);
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
                this.max_price=this.companyDetails.year_high;
                this.min_price=this.companyDetails.year_low;
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
		alert("The share sell successfully");
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
  getQuantity(quantity:number){
    this.quantity=quantity;
  }

  getAmount(data:number,quantity:number){
    this.amount = data * quantity;
  }
  cancel(){
    this.router.navigate(['my-shares'])
  }
}
