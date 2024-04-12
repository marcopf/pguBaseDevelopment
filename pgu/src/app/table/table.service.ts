import { Injectable } from '@angular/core';
import { GenericObject } from '../Interfaces';

@Injectable({
	providedIn: 'root'
})
export class TableService { 	
	objs:GenericObject[] = [];	
	objsKeys:string[] = [];
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
		if (dataList.length == 0 || dataList[0][keyToExpand] === undefined){
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
	
	async retrieveData(url: string, basicValue?: GenericObject[]) {
		if (basicValue != undefined){
			this.objs = this.keyExpander(basicValue, 'attributes');
			if (basicValue.length > 0)
				this.objsKeys = Object.keys(this.objs[0]);
			this.contentLoaded = true;
			return ;
		}
		// da implementare la parte di fetch dati con url
	}
	constructor() {
	}
}
