import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { authCodeFlowConfig } from '../oauth2.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigurazioneIstituzioneService } from '../configurazione-istituzione.service';
import { TranslatorPipe } from '../languages/translator.pipe';
import { LanguagesService } from '../languages/languages.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, TranslatorPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogged: boolean = false;
  currentLanguage: string = 'eng';

  constructor (protected configuration: ConfigurazioneIstituzioneService,private oauthService: OAuthService, @Inject(PLATFORM_ID) private _platform: Object, protected languagesService: LanguagesService){
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

  switchLanguage(_: any, selectedLanguage: string){
    this.languagesService.currentLanguage = selectedLanguage;
  }
}
