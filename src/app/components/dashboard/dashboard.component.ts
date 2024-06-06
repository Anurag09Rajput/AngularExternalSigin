import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private authService:AuthenticationService, private router:Router){}

  handleLogout(){
    console.log("asdasdasd")
    this.authService.sendAuthStateChangeNotification(false);
    this.router.navigateByUrl("/login");
  }
}
