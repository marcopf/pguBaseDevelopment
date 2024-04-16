import { Component, EventEmitter, Input, Output } from '@angular/core';
import URL from '../../assets/Url/url';
import { DynamicFormType } from '../Interfaces';
import { DynamicModalComponent } from '../dynamic-modal/dynamic-modal.component';

@Component({
	selector: 'app-toolbar',
	standalone: true,
	imports: [DynamicModalComponent],
	templateUrl: './toolbar.component.html',
	styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
	@Output()viewMode = new EventEmitter<string>;
	@Output()updateUsersStatus = new EventEmitter<boolean>;
	@Input()selectValues: string[] = ['Abilitati', 'Disabilitati'];
	@Input()selectLabel: string = 'Mostra Utenti';
	selectStatus: string = 'Abilitati';
	metaDataUrl: string = URL.gestione_utenti.AGGIUNGI_UTENTE_METADATA;
	submitUrl: string = URL.gestione_utenti.AGGIUNGI_UTENTE;
	formMetadata: DynamicFormType[] = [];
	extendUserRegistration: DynamicFormType[] = [
		{
			id: "enabled",
			label: "Abilitare Utente?",
			type: "TOGGLE",
			required: false,
			controls: [],
			value: "false",
			disabled: false
		}
	];

	handleChange(event: any){
		this.viewMode.emit(event.currentTarget.value);
		this.selectStatus = event.currentTarget.value;
	}

	changeUsersStatus(event: any){
		this.updateUsersStatus.emit(true);
	}
}
