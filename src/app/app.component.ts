import { Component, inject } from '@angular/core';
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularproject';

   socialAuthSerive = inject(SocialAuthService);

   ngOnInit(){
    this.socialAuthSerive.authState.subscribe((resp)=>{
    })
   }
}
