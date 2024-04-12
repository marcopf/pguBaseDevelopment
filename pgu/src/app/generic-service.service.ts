import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
	providedIn: 'root'
})
export class GenericServiceService {

	checkStatus(statusCode: number){
		if (statusCode == 401){
			this.oauth.loadDiscoveryDocumentAndLogin();
		}
	}

	constructor(private oauth: OAuthService) { }
}
