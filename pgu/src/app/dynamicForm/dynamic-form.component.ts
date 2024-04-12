import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { FormToggleComponent } from './form-toggle/form-toggle.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FormTextComponent } from './form-text/form-text.component';
import { FormSelectComponent } from './form-select/form-select.component';
import getDynamicForm from './API/getDynamicForm';
import { SpinnerComponent } from '../table/spinner/spinner.component';
import { FormNumberComponent } from './form-number/form-number.component';
import { DynamicFormType, FormControlObjectType } from '../Interfaces';

@Component({
	selector: 'app-dynamic-form',
	standalone: true,
	imports: [FormToggleComponent, FormCheckboxComponent, FormDateComponent, FormTextComponent, FormSelectComponent, ReactiveFormsModule, SpinnerComponent, FormNumberComponent],
	templateUrl: './dynamic-form.component.html',
	styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit, OnChanges{
	@Input() incomingData: string = "";
	@Input() formTitle: string = "";
	@Input() formBtn: string = "";
	@Input() basicValue:	DynamicFormType[] | null = null;
	@Output() formData = new EventEmitter<FormControlObjectType>;
	@Output() dataAsked = new EventEmitter<boolean>;
	@Input() contentLoaded: boolean = false;

	tag: string = "";
	addUserForm = new FormGroup({});
	controlsReference: FormControlObjectType = {};
	formGroupObj: FormControlObjectType = {};

	/**
	 * Funzione che viene chiamata quando si effettua il submit del form,
	 * scatenando cosi sia l'evento relativo al trigger del pulsante che quello
	 * relativo all'emissioni di dati vera e propria, dati che vengono raccolti
	 * dal form appena compilato.
	 * 
	 * verra' emesso un json del tipo:
	 * {
	 * 		<id_definito_in_Creazione>: <valore_trovato>
	 * }
	 */
	onSubmit(){
		this.dataAsked.emit(true);
		this.formData.emit(this.addUserForm.value)
	}

	/**
	 * funzione che inizialliza il form nel caso in cui si voglia costruire quest'ultimo
	 * a partire da un URL il quare come risposta ritorna un json compatibile
	 * con il tipo <DynamicFormType>
	 */
	formInit(){
		getDynamicForm(this.incomingData).then(res=>{
			this.contentLoaded = true;
			this.basicValue = res;
			this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue!);
			this.addUserForm = new FormGroup(this.formGroupObj);
		})
	}

	/**
	 * Funzione che viene chiamata ogni qualvolta i parametri in Input() subiscano
	 * una variazione, in questo caso dapprima controlla se il form va costruito a partire da un'url
	 * o da un'oggetto passato in input e poi ricostruisce l'oggetto che permette la validazione
	 * del form.
	 * 
	 * @param changes - non usato
	 */
	ngOnChanges(changes: SimpleChanges) {
		if (this.basicValue == null){
			this.formInit();
			return ;
		}
		this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue);
		this.addUserForm = new FormGroup(this.formGroupObj);
	}
	
	/**
	 * Funzione che viene chiamata all'inizio del ciclo di vito del componente.
	 * In questo caso dapprima controlla se il form va costruito a partire da un'url
	 * o da un'oggetto passato in input costruendo poi l'oggetto che permette la validazione
	 * vera e propria del form.
	 * 
	 * @param changes - non usato
	 */
	ngOnInit(): void {
		if (this.basicValue == null){
			this.formInit();
			return ;
		}
		this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue);
		this.addUserForm = new FormGroup(this.formGroupObj);
	}

	constructor(protected formFields: DynamicFormService){
	}
}
