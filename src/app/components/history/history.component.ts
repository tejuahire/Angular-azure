import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetDataService } from 'src/app/services/get-data.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private getDataservice: GetDataService) { }

  history;
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.getDataservice.getHistory(localStorage.getItem('username'))
      .subscribe(
        
        
        data => {
          
          
          if (data.length)
            this.history = data;
        },
        error => {
          console.log(error)
        }
      )
  }

}
