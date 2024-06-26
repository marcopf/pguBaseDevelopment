import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { LanguagesService } from '../../../assets/Languages/languages.service';
import { TranslatorPipe } from '../../../assets/Languages/translator.pipe';
import { DynamicFormType, FormControlObjectType, GenericObject } from '../../Interfaces';
import { DynamicModalComponent } from '../../dynamic-modal/dynamic-modal.component';
import  URL  from '../../../assets/Url/url'
import { DynamicModalService } from '../../dynamic-modal/dynamic-modal.service';
@Component({
	selector: 'app-ricerca-utenze',
	standalone: true,
	imports: [DynamicFormComponent, TranslatorPipe, DynamicModalComponent],
	templateUrl: './ricerca-utenze.component.html',
	styleUrl: './ricerca-utenze.component.scss'
})
export class RicercaUtenzeComponent {
	@Output() onFormDataAvailable = new EventEmitter<FormControlObjectType>
	@Output() onSearchButtonPressed = new EventEmitter<boolean>
	@Input() outgoingDataUrl: null | string = null;
	metaDataUrl: string = URL.gestione_utenti.AGGIUNGI_UTENTE_METADATA;
	submitUrl: string = URL.gestione_utenti.AGGIUNGI_UTENTE;
	formMetadata: DynamicFormType[] = [];

	form1: DynamicFormType[] = [
		{
			id: "firstName",
			label: "Nome",
			type: "TEXT",
			required: false,
			controls: ["^.{0,255}$"],
			value: "",
			disabled: false
		},{
			id: "lastName",
			label: "Cognome",
			type: "TEXT",
			required: false,
			controls: ["^.{0,255}$"],
			value: "",
			disabled: false
		}
	];
	form2: DynamicFormType[] = [
		{
			id: "codiceFiscale",
			label: "Codice Fiscale",
			type: "TEXT",
			required: false,
			controls: ["^.{0,255}$"],
			value: "",
			disabled: false
		}
	];
	form3: DynamicFormType[] = [
		{
			id: "email",
			label: "Email",
			type: "TEXT",
			required: false,
			controls: ["^.{0,255}$"],
			value: "",
			disabled: false
		}
	];

	/**
	 * Funzione che semplicemente fa da tramite tra in componente <dynamicFormComponent>
	 * e il genitore di questo componente, quando l'utente clicca invio l'evento generato
	 * nel form passa attraverso questa funzione che ne emette uno a sua volta
	 * 
	 * @param formData - Rappresenta il form con i dati inseriti al suo interno
	 */
	catchData(formData:any){
		this.onFormDataAvailable.emit(formData);
	}
	
	/**
	 * Funzione che semplicemente fa da tramite tra in componente <dynamicFormComponent>
	 * e il genitore di questo componente, quando l'utente clicca invio l'evento generato
	 * nel form passa attraverso questa funzione che ne emette uno a sua volta
	 * 
	 * @param e - Rappresenta un booleano che avverte la pressione di un pulsante
	 */
	handleSubmit(e: any){
		this.onSearchButtonPressed.emit(true);
	}

	constructor(protected languageServices: LanguagesService, protected userFormService: DynamicModalService){
		this.userFormService.getUserData(this.metaDataUrl, []).then(res=>{

			this.formMetadata = Object.assign([], this.userFormService.formMetaData);
			console.log(this.formMetadata)
			this.formMetadata.forEach(input=>{
				input.required = false;
				input.disabled = false;
				input.controls = [];
			})
		})
	}
}
