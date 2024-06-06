import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ExternalAuth } from '../models/external-auth';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { apiEndpoints } from '../utilities/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  private extAuthChangeSub = new Subject<SocialUser>();
  public authChanged = this.authChangeSub.asObservable();
  public extAuthChanged = this.extAuthChangeSub.asObservable();

  constructor(
    private externalAuthService: SocialAuthService,
    private apiService: ApiService
  ) {
    this.externalAuthService.authState.subscribe((user) => {
      console.log(user);
      this.extAuthChangeSub.next(user);
      this.signInWithGoogle();
    });
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  public signInWithGoogle(): Observable<boolean> {
    this.externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.extAuthChanged.subscribe((user) => {
      const externalAuth: ExternalAuth = {
        provider: user.provider,
        idToken: user.idToken,
      };
      return of(this.validateExternalAuth(externalAuth));
    });
    return of(false);
  }

  private validateExternalAuth(externalAuth: ExternalAuth): boolean {
    this.apiService
      .post<ApiResponse<ExternalAuth>>(
        apiEndpoints.externalLoginEndpoint,
        externalAuth
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', JSON.stringify(res.data));
          this.sendAuthStateChangeNotification(res.isSuccess);
          return true;
        },
        error: (err) => {
          this.signOutExternal();
          return false;
        },
      });
    return false;
  }
  
  public signOutExternal() {
    this.externalAuthService.signOut();
  }
}
