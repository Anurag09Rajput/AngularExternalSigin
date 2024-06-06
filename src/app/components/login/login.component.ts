import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { LoginUser } from 'src/app/shared/models/login-user';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { apiEndpoints } from 'src/app/shared/utilities/api-endpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: LoginUser = new LoginUser();
  showError: boolean = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthenticationService
  ) {}
  onSubmitLoginForm() {
    this.apiService
      .post<ApiResponse<LoginUser>>(apiEndpoints.loginEndpoint, this.user)
      .subscribe((resp) => {
        if (resp.isSuccess) {
          localStorage.setItem('token', JSON.stringify(resp.data));
          this.authService.sendAuthStateChangeNotification(resp.isSuccess);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.showError = true;
        }
      });
  }

  clearForm() {
    this.user = new LoginUser();
  }

  externalLogin() {
    this.authService.signInWithGoogle().subscribe((res) => {
      if (res) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
