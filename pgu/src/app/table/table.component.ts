import { Component, Input, OnInit, Output } from '@angular/core';
import { TableService } from './table.service';
import { EventEmitter } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { GenericObject, TableConfig } from '../Interfaces';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [SpinnerComponent, RouterModule],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	animations: [
		trigger('inOutAnimation', [
			transition(':enter',[
				style({
					opacity: 0,
					transform:	'scale(1.01)'
				}),
				animate('0.5s ease-out', style({
					opacity: 1,
					transform:	'scale(1)'
				}))
			]),
			transition(':leave', [
				style({	opacity: 1	}),
				animate('0.6s	ease-in', style({opacity:	0 }))
			])
		])
	]
})
export class TableComponent implements OnInit{
	selectedLines: GenericObject[] = [];
	@Output() lineChanges = new EventEmitter<GenericObject[]>;
	@Input() retrieveUrl: string = "";
	@Input() basicValue: GenericObject[] | undefined = undefined;
	@Input() tableConfig: TableConfig = {
		incomingDataLink: null,
		outgoingDataLink: null,
		type: null,
		text: null,
		hasCheckBox: false
	}

	/**
	 * La funzione va dapprima a recuperare l'id dell'utente selezioneato per poi
	 * ottenere dall'oggetto contenente tutti gli utenti ottenuti quello che e' stato appena
	 * targettato.
	 * in seguito viene controllato se l'elemento e' gia presente nell'array, in caso
	 * negativo lo aggiungo nella lista di utenti selezionati, altrimenti cerco l'utente
	 * nella lista degli utenti selezionati e lo rimuovo.
	 * 
	 * infine viene emesso un segnale contenente tutti gli utenti selezionati.
	 * 
	 * @param echeckBox Rappresenta il bersaglio che e' stato cliccato
	 */
	updateSelected(checkBox: any){
		let selectedLine = checkBox.target;
		let selectedLineId = selectedLine.getAttribute('id').split("*")[1];
		let selectedObj = this.tableService.objs.filter(el=> el['_id'] == selectedLineId)[0];

		if (this.selectedLines.filter(el=>el['_id'] == selectedObj['_id']).length == 0){
			this.selectedLines.push(selectedObj);
		}else{
			let objPosition = 0;

			this.selectedLines.forEach((el, i)=>{
				if (el['_id'] == selectedObj['_id']){
					objPosition = i;
				}
			})
			this.selectedLines.splice(objPosition, 1)
		}
		this.lineChanges.emit(this.selectedLines);
	}

	/**
	 * Funzione che "clicca" tutte le checkbox presenti all'interno della pagina attuale della tabella
	 * e successivamente in base allo stato aggiorna i valori contenuti all'interno dell'oggetto
	 * che conserva i valori relativi alle linee selezionate
	 * 
	 * @param event - checkbox target
	 */
	selectAll(event: any){
		this.tableService.objs.forEach((element: any)=>{
			element['checkboxStatus'] = !element['checkboxStatus'];
		})
		if (event.currentTarget.checked)
			this.selectedLines = Object.assign([], this.tableService.objs);
		else
			this.selectedLines = [];
		this.lineChanges.emit(this.selectedLines);
	}

	ngOnInit(): void {
		this.tableService.retrieveData(this.retrieveUrl, this.basicValue);
		this.tableService.objs.forEach((element: any)=>{
			element['checkboxStatus'] = false;
		})
	}


	constructor(protected tableService: TableService){
	}
}
