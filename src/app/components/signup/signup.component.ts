import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { ApiService } from 'src/app/shared/services/api.service';
import { apiEndpoints } from 'src/app/shared/utilities/api-endpoints';
import { RegisterUser } from 'src/app/shared/models/regiser-user';
import { ApiResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user:RegisterUser= new RegisterUser();
  constructor(private router:Router , private apiService:ApiService){  }
  OnSubmitSignupForm(signupForm:NgForm) {
    console.log(signupForm.value);
    this.user.email = signupForm.value.email;
    this.user.firstName = signupForm.value.firstName;
    this.user.lastName = signupForm.value.lastName;
    this.user.password = signupForm.value.password;
    this.user.confirmPassword = signupForm.value.confirmPassword;

    this.apiService.post<ApiResponse<RegisterUser>>(apiEndpoints.signupEndpoint,this.user).subscribe((resp)=>{
      console.log(resp);
      if(resp.isSuccess){
        this.router.navigate(['/login']);
      }
    })
  }

  ClearForm(signupForm:NgForm){}
}
