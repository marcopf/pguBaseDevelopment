import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { authCodeFlowConfig } from '../oauth2.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogged: boolean = false;

  constructor (private oauthService: OAuthService, @Inject(PLATFORM_ID) private _platform: Object){
    if (isPlatformBrowser(this._platform)){
      this.oauthService.configure(authCodeFlowConfig);
      console.log(this.oauthService.loadDiscoveryDocumentAndLogin());
      this.oauthService.setupAutomaticSilentRefresh();
    }
  }

  checkStatus(){
    if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()){
      this.isLogged = true;
    }
  }

  login(){
    window.location.href = "";
    console.log(this.oauthService.loadDiscoveryDocumentAndTryLogin());

  }

  logout(){
    this.oauthService.revokeTokenAndLogout()
    this.oauthService.logOut();
  }
}
