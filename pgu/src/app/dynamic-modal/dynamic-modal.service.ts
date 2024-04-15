import { Injectable } from '@angular/core';
import { DynamicFormType, GenericObject } from '../Interfaces';
import { GenericServiceService } from '../generic-service.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class DynamicModalService {
	formMetaData: any[] = [];
	contentLoaded: boolean = false;
	weHaveResponse: boolean | string | null = null;


	/**
	 * Funzione che scorre tutto l'array passato in input e va ad estrarre	
	 * tutti i valori presenti nell'attributo specificato da <keyToExpand>
	 *	
	 * @param dataList - Una lista che contiene gli oggetti nei quali sono
	 * presenti attributi da espandere
	 *	
	 * @param keyToExpand - Una stringa che rappresenta la chiave relativa
	 * all'attributo che si vuole espandere
	 * @returns L'oggetto espanso
	 */
	keyExpander(dataList: GenericObject[], keyToExpand: string): GenericObject[]{
		if (dataList[0][keyToExpand] === undefined){
			return [];
		}
		dataList.forEach((obj)=>{
			let tempMemory = obj[keyToExpand] as unknown as GenericObject;
			let keys = Object.keys(tempMemory);
			let objKeys = Object.keys(obj);

			objKeys.forEach(key=>{
				if (key[0] == '_' && key != '_id'){
					delete obj[key];
				}
			})
			delete obj[keyToExpand];
			keys.forEach(key=>{
				obj[key] = tempMemory[key];
			})
		})
		return dataList;
	}

	/**
	 * Funzione che ottiene le informazioni relative all'utente selezionato,
	 * informazioni relative ai campi da compilare e anche ai valori da
	 * precompilare la funzione inoltre salva una "copia" della risposta in
	 * <this.unexpandedUserData> per poter comporre poi l'oggetto di risposta
	 * relativo alla modifica effettiva dei dati
	 */
	async getUserData(url: string, formExtension: DynamicFormType[]){
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			}
		})
		this.contentLoaded = true;
		this.genericService.checkStatus(res.status);
		try {
			let values = await res.json();
			let formMetadata = Object.assign([], values.userAttributesMetadata);

			this.formMetaData = this.keyExpander(formMetadata, 'validator');
			this.formMetaData.forEach(element=>{
				element['id'] = element.name;
				element['value'] = "";
			})
			formExtension.forEach(newElement=>{
				this.formMetaData.push(newElement);
			})
		} catch (error) {
			console.log(error)
		}
	}

	/**
	 * Funzione che estrapola l'id del nuovo utente appena creato dall'header
	 * Location.
	 * 
	 * @param location - stringa contenente l'header location ottenuto
	 * alla risposta di <sendUserCreationInfo>
	 * @returns l'id del nuovo utente appena creato o una stringa vuota
	 */
	getIdFromLocation(location: string | null){
		let locationSplitted = location?.split('/');

		if (locationSplitted != undefined)
			return locationSplitted[locationSplitted.length - 2];
		return '';
	}

	/**
	 * Funzione che effettua la chiamata API tramite fetch
	 * 
	 * @param submitUrl - url al quale viene effettuato il submit
	 * @param data - dati da inserire nel body della richiesta
	 * @returns l'oggetto risposta
	 */
	async sendUserCreationInfo(submitUrl: string, data: any){
		const res =	await fetch(submitUrl,	{
			method:	'POST',
			headers: {
				'Access-Control-Expose-Headers': 'Location',
				'Content-Type':	'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			},
			body: JSON.stringify(data)
		});
		return res;
	}

	/**
	 * Funzione che applica a tutti i campi del form gli errori che il server 
	 * ha riscontrato in fase di creazione utente.
	 * 
	 * @param jsonRes - json contenente tutti gli errori che sono stati
	 * inviati dal server
	 */
	manageErrors(jsonRes: any){
		jsonRes.errors.forEach((error: any)=>{
			if (error.errorMessage != undefined && error.field == undefined){
				this.weHaveResponse = error.errorMessage;
				return;
			}
			let input = document.querySelector('#' + error.field);
			let inputTooltip = document.querySelector('#' + error.field + '-tooltip');

			this.weHaveResponse = 'Errore: informazioni inserite non valide!'
			input?.classList.add('is-invalid');
			input?.classList.remove('is-valid');
			inputTooltip?.classList.add('text-danger');
			inputTooltip!.textContent = 'Errore: sono stati inseriti caratteri non validi';
		})
	}

	/**
	 * Funzione che formatta i dati ricevuti dall'utente e gestisce i casi di risposta
	 * applicando gli errori se presenti o reindirizzando l'user alla pagina relativa al nuovo
	 * utente creato se tutto va a buonfine.
	 * 
	 * @param userInsertedData - Oggetto che contiene tutti i dati inseriti dall'utente
	 * in fase di creazione del nuovo utente.
	 * @param submitUrl - url dove verranno inviati i dati raccolti e formattati
	 * @param modalRef  - referenza al modale creato
	 */
	async createNewUser(userInsertedData: any, submitUrl: string, modalRef: any){
		let keys = Object.keys(userInsertedData);
		let obj: any = {
			attributes: {

			}
		}
		keys.forEach((key: string)=>{
			if (key == 'username' || key == 'firstName' || key == 'lastName' || key == 'email' || key == 'enabled'){
				obj[key] = userInsertedData[key];
			}
			else{
				if (Array.isArray(userInsertedData[key]))
					obj.attributes[key] = userInsertedData[key];
				else
					obj.attributes[key] = [userInsertedData[key]];
			}
		})
		const res = await this.sendUserCreationInfo(submitUrl, obj);

		this.genericService.checkStatus(res.status);
		if (res.status == 201){
			const queryParams = {id: this.getIdFromLocation(res.headers.get('Location'))};
	
			this.weHaveResponse = true;
			setTimeout(() => {
				this.weHaveResponse = null;
				modalRef.hide();
				this.router.navigate(['/gestione-utenti/dettaglio-utente'], { queryParams })
			}, 1000);
		}
		else
			this.manageErrors(await res.json());
	}

	constructor(private genericService: GenericServiceService, private router: Router) { }
}
