import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { authCodeFlowConfig } from '../oauth2.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConfigurazioneIstituzioneService } from '../configurazione-istituzione.service';
import { TranslatorPipe } from '../../assets/Languages/translator.pipe';
import { LanguagesService } from '../../assets/Languages/languages.service';

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
      this.oauthService.loadDiscoveryDocumentAndLogin();
      this.oauthService.setupAutomaticSilentRefresh();
    }
  }

  /**
   * Semplice funzione che effettua un controllo sull'utente corrente,
   * e valuta se quest'ultimo e loggato e possiede un token valido.
   * 
   * Il controllo sfrutta le funzioni messe a disposizione dal pacchetto <angular-oauth2-oidc>
   */
  checkStatus(){
    if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()){
      this.isLogged = true;
    }
  }

  /**
   * Semplice funzione che triggera il redirect alla pagina di login
   * specificata nel file di configurazione OAUTH2 [src/app/oauth2.config.ts].
   * 
   * Il redirect come anche l'intera gestione dell flusso OAUTH2 viene gestito dalle funzioni
   * messe a disposizione dal pacchetto <angular-oauth2-oidc>
   */
  login(){
    window.location.href = "";
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

  }

  /**
   * Semplice funzione che invalida il token attualmente detenuto dall'utente corrente
   * ed effettua il logout dalla sessione.
   * 
   * l'intera gestione dell flusso OAUTH2 viene gestito dalle funzioni messe
   * a disposizione dal pacchetto <angular-oauth2-oidc>
   */
  logout(){
    this.oauthService.revokeTokenAndLogout()
    this.oauthService.logOut();
  }
}
