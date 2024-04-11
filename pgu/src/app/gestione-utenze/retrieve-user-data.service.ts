import { Injectable } from '@angular/core';
import URL from '../../assets/Url/url';
import { GenericObject, Pagination } from '../Interfaces';

@Injectable({
	providedIn: 'root'
})
export class RetrieveUserDataService {

	/**
	 * Funzione che prepara la stringa contenente i query params da aggangiare all'url
	 * durante la chiamata API.
	 * 
	 * Dapprima cicla l'oggetto che contiene tutti i valori per i quali l'utente vuole cercare <obj>,
	 * sommandoli alla stringa seguendo il pattern dei queryParams.
	 * 
	 * In seguito si agganciano sempre come queryParams i valori relativi alla pagination
	 * ricavati da <paginationInfo>
	 * 
	 * @param obj - oggetto contenente i valori per i quali l'utente vuole cercare
	 * @param paginationInfo - oggetto contenente informazioni relative alla paginazione
	 * @returns - stringa con tutti i queryParams correttamente formattata
	 */
	prepareQueryParamsString(obj: GenericObject, paginationInfo?: Pagination){
		let keys = Object.keys(obj);
		let queryParamsPart = '?';

		keys.forEach((key, index)=>{
			if (index != 0){
				queryParamsPart += `&${key}=${obj[key]}`
			}else{
				queryParamsPart += `${key}=${obj[key]}`
			}
		})
		if (paginationInfo != undefined){
			queryParamsPart += `&page=${paginationInfo.page}&size=${paginationInfo.size}`
		}
		return queryParamsPart
	}

	/**
	 * Funzione che effettua la ricerca tramite FETCH e i queryParams ottenuti da
	 * <prepareQueryParamsString()> 
	 * 
	 * @param obj - oggetto contenente i valori per i quali l'utente vuole cercare
	 * @param paginationInfo - oggetto contenente informazioni relative alla paginazione
	 * @returns - values retrived from server
	 */
	async searchUser(obj: GenericObject, paginationInfo?: Pagination){
		let queryParamsPart = this.prepareQueryParamsString(obj, paginationInfo);
		let jsonRes = {
			content: [],
			totalElements: 0,
			totalPages: 0,
			number: 1,
			size: 10,
			numberOfElements: 0
		};

		//effttuo la chimata all'endpoint agganciando tutti i query params elaborati
		const res = await fetch(URL.gestione_utenti.CERCA_UTENTI + queryParamsPart, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			}
		});
		try {
			jsonRes = await res.json();
		} catch (error) {
			console.log(error);
		}
		return jsonRes;
	}

	constructor() { }
}
