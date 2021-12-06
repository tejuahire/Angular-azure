import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authentocationService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit() {
    // this.authentocationService.logOut();
    let varr = confirm("User logout successfully");
    if (varr) {
      this.authentocationService.logOut();
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['']);
    }

  }

}