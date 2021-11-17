import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from '../../services/get-data.service';
import { AuthenticationService } from '../../services/authenticate.service'
import { Company } from 'src/app/company';
import { interval, Observable } from "rxjs";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companyes: Observable<Company[]>;
  // companyes :any=[];
  name:any;
  data:number=Math.floor(Math.random() * 20);
  price:number;

@Input()
  companyDetails;
  private _Activatedroute: any;
  companyId: any;
  constructor(private router: Router, 
              private getDataservice: GetDataService, 
              private toastr: ToastrService,
              private loginService:AuthenticationService) { const obs$=interval(1000);
                obs$.subscribe((d)=>{
                    this.data=this.getDataservice.dostuff(this.data,20);
                    console.log(this.data);
                });
            }
              watchList;
  ngOnInit() {

    
    this.loadData();
    this.reloadData();

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
    
    // this.getDataservice.getAllCompany()
    // .subscribe(
    //   data => {
    //       this.companyDetails = data;
    //   },
    //   error => {
    //       console.log(error)
    //   }
    // )
   
  }


  reloadData() {
    this.companyes = this.getDataservice.getAllCompany();
  }

  loadData()
  {
    this.getDataservice.getWatchList(localStorage.getItem('username'))
    .subscribe(
      data => {
        if(data.length)
          this.watchList = data;
          
      },
      error => {
          console.log(error)
      }
    )
  }

  addToWatchlist(companyId, companyName)
  {
    this.getDataservice.addWatchList(localStorage.getItem('username'),companyId)
    .subscribe(
      data => {console.log(data)
        if(data.status=='company exist')
          this.toastr.error('Already Exsist to your watchlist', companyName,{positionClass:"toast-bottom-center"});
        else
          this.toastr.info('Successfully added to your Watch list', companyName,{positionClass:"toast-bottom-center"});
      },
      error => {
          console.log(error)
      }
    )
  }

  goToBuyPage(companyId)
  {    
    this.router.navigate(['buy',companyId])
  }
  goToDetailedView(companyId)
  {    
    this.router.navigate(['view',companyId])
  }

 
}
