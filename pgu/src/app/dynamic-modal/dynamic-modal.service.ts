import { Injectable } from '@angular/core';
import { DynamicFormType, GenericObject } from '../Interfaces';
import URL from '../../assets/Url/url';
import { GenericServiceService } from '../generic-service.service';

@Injectable({
	providedIn: 'root'
})
export class DynamicModalService {
	formMetaData: any[] = [];
	contentLoaded: boolean = false;

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
	async getUserData(url: string){
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
			})
		} catch (error) {
			console.log(error)
		}
	}

	constructor(private genericService: GenericServiceService) { }
}
