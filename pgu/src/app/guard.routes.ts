import { Inject, inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export default class Guard {

    isLogged(){
        let oauthService = inject(OAuthService);
        let _platformId = inject(PLATFORM_ID);

        if (isPlatformBrowser(_platformId)){
            if (oauthService.hasValidAccessToken() && oauthService.hasValidIdToken())
                return true;
            else{
                window.location.href = "";
                oauthService.loadDiscoveryDocumentAndLogin()
            }
        }
        return false;
    }
}