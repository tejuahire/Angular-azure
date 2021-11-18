import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { GetDataService } from '../../services/get-data.service';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  companyId = '';
  quantity:number=0 ;
  companyDetails;
  data:number=Math.floor(Math.random() * 20);
  amount:number;
  price:number;
  constructor(private router: Router, 
              private getDataservice: GetDataService, 
              private _Activatedroute:ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {

    const obs$=interval(1000);
    obs$.subscribe((d)=>{
        this.data=this.getDataservice.dostuff(this.data,this.price);
        this.getAmount(this.data,this.quantity);
        console.log(this.data);
    });


    this._Activatedroute.paramMap.subscribe(params => { 
      this.companyId = params.get('id'); 
      });

      this.getDataservice.getOneCompany(this.companyId)
      .subscribe(
        data => {
            this.companyDetails = data;
            this.price=this.companyDetails.current_rate;
        },
        error => {
            console.log(error)
        }
      )
  }

  buyItem() 
  {
    this.getDataservice.buyShare( localStorage.getItem('username'), this.companyId, this.quantity)
      .subscribe(
        data => {console.log(data)
          if(data.status=="success"){
	    alert("The share buy successfully");
            this.router.navigate(['my-shares'])  }        
          else if(data.status=="insufficient balance")
            this.toastr.error("",'Insufficient balance in your account',{positionClass:"toast-bottom-center"});
        },
        error => {
            console.log(error)
        }
      )
  }
  checkQuantity(qty)
  {
    
    
    if(isNaN(Number(qty.value)) || Number(qty.value) === 0 ||Number(this.companyDetails.volume) <1 )
      return false;
    else if(Number(qty.value) <= Number(this.companyDetails.volume))
      return true;
  }

  getQuantity(quantity:number){
    this.quantity=quantity;
  }

  getAmount(data:number,quantity:number){
    this.amount = data * quantity;
  }
 cancel(){
    this.router.navigate(['my-shares']);
  }
}

