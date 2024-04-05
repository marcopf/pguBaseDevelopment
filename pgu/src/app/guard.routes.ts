import { inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";

function isLogged(){
        let oauthService = inject(OAuthService)
        if (oauthService.hasValidAccessToken() && oauthService.hasValidIdToken())
            return true;
        return false;
}

export default isLogged
