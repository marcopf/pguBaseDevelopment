import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { UserInfoService } from './user-info.service';

@Component({
	selector: 'app-dettaglio-utente',
	standalone: true,
	imports: [DynamicFormComponent],
	templateUrl: './dettaglio-utente.component.html',
	styleUrl: './dettaglio-utente.component.scss'
})
export class DettaglioUtenteComponent implements OnInit, OnDestroy{
	contentLoaded: boolean = false;

	/**
	 * Funzione che viene eseguita all'inizio del ciclo di vita del componente,
	 * in questo caso va semplicemente a chiamare la funzione che ottiene e formatta
	 * tutti i dati necessari alla creazione del form di aggiornamento delle
	 * informazioni
	 */
	ngOnInit(): void {
		this.userInfoService.fillCurrentForm()
	}

	/**
	 * 
	 * Funzione chiamata ogni qualvolta il componente viene distrutto,
	 * in questo caso servo lo scopo di resettare le variabili che verranno
	 * poi usate dal selvizio per caricare il form utente.
	 */
	ngOnDestroy(): void {
		this.userInfoService.formMetaData = [];
		this.userInfoService.userData = {};
		this.userInfoService.unexpandedUserData = {};
		this.userInfoService.contentLoaded = false;
		this.userInfoService.userId = '';
		this.userInfoService.weHaveResponse = null;
	}

	constructor(protected userInfoService: UserInfoService){
	}
}
