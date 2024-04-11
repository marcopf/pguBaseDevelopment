import { Injectable	} from '@angular/core';
import URL from	'../../../assets/Url/url';
import { GenericObject } from '../../Interfaces';
import { ActivatedRoute	} from '@angular/router';

@Injectable({
	providedIn:	'root'
})
export class UserInfoService{
	formMetaData: any[]	= [];
	userData: any =	{};
	unexpandedUserData:	any	= {};
	contentLoaded: boolean = false;
	userId:	string = '';
	weHaveResponse: boolean | null = null;

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
	keyExpander(dataList: GenericObject[], keyToExpand:	string): GenericObject[]{
		if (dataList[0][keyToExpand] === undefined){
			return [];
		}
		dataList.forEach((obj)=>{
			let	tempMemory = obj[keyToExpand] as unknown as GenericObject;
			let	keys = Object.keys(tempMemory);
			let	objKeys	= Object.keys(obj);

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
	async getUserData(){
		this.userId	= this.activatedRoute.snapshot.queryParams['id'];
		const res =	await fetch(`${URL.dettaglio_utenze.GET_USER_DATA}${this.userId}/?metadata=true`, {
			method:	'GET',
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			}
		})
		try	{
			let	values = await res.json();
			let	formMetadata = Object.assign([], values.userProfileMetadata.attributes);
			let	userData = Object.assign({}, values);

			this.unexpandedUserData	= values;
			this.formMetaData =	this.keyExpander(formMetadata, 'validator');
			this.userData =	this.keyExpander([userData], 'attributes')[0];
		} catch	(error)	{
			console.log(error)
		}
	}
	
	/**
	 * Funzione che dopo aver richiesto i dati tramite <this.getUserData()>,
	 * cicla l'array contenente tutte le chiavi relative ai valori ottenuti
	 * dal server andandoli ad inserire nell'oggetto che viene utilizzato
	 * per la costruzione del form dinamico ovvero <this.formMetaData>
	 */
	async fillCurrentForm(){
		await this.getUserData();

		this.contentLoaded = true;
		Object.keys(this.userData).forEach(key=>{
			this.formMetaData.forEach((element:	any) => {
				if (element.id == key && this.userData[key]	!= undefined){
					element.value =	this.userData[key];
				}
			});
		})
	}

	/**
	 * Funzione che va a preparare l'oggetto che <this.getUserData()> si era salvato
	 * in <this.unexpandedUserData> andando pero' a inserire in nuovi valori al suo interno.
	 * 
	 * Fatto cio' si elimina <userProfileMetadata> poiche' interferisce con la chiamata PUT
	 * e <enabled> dato che non serve e potrebbe causare problemi con modifiche in contemporanea
	 * 
	 * @param formData - json contenente tutti i valori raccolti dal form
	 * @returns l'oggetto finale formattato
	 */
	prepareFormBody(formData: any){
		let	obj	= Object.assign({},	this.unexpandedUserData);
		let	keys = Object.keys(formData);
		
		keys.forEach(key=>{
			if (obj[key] == undefined){
				console.log(key, formData[key])

				if (Array.isArray(formData[key]))
					obj.attributes[key]	= formData[key]	== undefined ? '' :	formData[key];
				else
					obj.attributes[key]	= formData[key]	== undefined ? ['']	: [formData[key]];
			}
			else
				obj[key] = formData[key] == undefined ?	'' : formData[key];
		})
		delete obj.enabled
		delete obj.userProfileMetadata
		return obj
	}

	/**
	 * Funzione che viene chiamata al submit del form relativo alla modifica dei dati anagrafici
	 * prima viene preparato il body e in seguito viene effettuata una chiamata PUT contenebte i
	 * dati modificati nel body.
	 * 
	 * alla risposta viene mostrato un messaggio con un feedback sull'esito della richiesta.
	 * 
	 * @param formData - json contenente tutti i valori raccolti dal form
	 */
	async handleSubmit(formData:any){	
		let	preparedForm = this.prepareFormBody(formData);

		this.userId	= this.activatedRoute.snapshot.queryParams['id'];
		const res =	await fetch(`${URL.dettaglio_utenze.PUT_UPDATED_USER_DATA}${this.userId}/`,	{
			method:	'PUT',
			headers: {
				'Content-Type':	'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			},
			body: JSON.stringify(preparedForm)
		});
		if (res.ok){
			this.weHaveResponse = true;
			setTimeout(() => {
				this.weHaveResponse = null;
			}, 3000);
		}
		else{
			this.weHaveResponse = false;
			setTimeout(() => {
				this.weHaveResponse = null;
			}, 3000);
		}
	}

	/**
	 * Funzione che viene chiamata al change del toggle relativo alla modifica dello status
	 * viene prima modificato il valore relativo allo status in <this.unexpandedUserData>
	 * successivamente viene eleiminato l'oggetto <userProfileMetadata> poiche' interferirebbe
	 * con la richiesta PUT, in seguito la richiesta viene effettuata.
	 * 
	 * alla risposta viene mostrato un messaggio con un feedback sull'esito della richiesta.
	 * 
	 * @param e - non usato
	 * @param newStuatus - booleano dal valore opposto allo status attuale 
	 */
	async manageUserStatus(e: any, newStatus: boolean){
		this.userId	= this.activatedRoute.snapshot.queryParams['id'];
		this.unexpandedUserData.enabled	= newStatus;
		delete this.unexpandedUserData.userProfileMetadata

		const res =	await fetch(`${URL.dettaglio_utenze.PUT_UPDATED_USER_DATA}${this.userId}/`,	{
			method:	'PUT',
			headers: {
				'Content-Type':	'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			},
			body: JSON.stringify(this.unexpandedUserData)
		});
		if (res.ok){
			this.weHaveResponse = true;
			setTimeout(() => {
				this.weHaveResponse = null;
			}, 3000);
		}
		else{
			this.weHaveResponse = false;
			setTimeout(() => {
				this.weHaveResponse = null;
			}, 3000);
		}
	}

	constructor(private	activatedRoute:	ActivatedRoute)	{
	}
}
