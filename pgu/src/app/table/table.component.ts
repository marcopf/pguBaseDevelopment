import { Component, Input, OnInit, Output } from '@angular/core';
import { TableService } from './table.service';
import { EventEmitter } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { GenericObject, TableConfig } from '../Interfaces';

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [SpinnerComponent, RouterModule],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
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
		let selectedLineId = selectedLine.getAttribute('id').split("-")[1];
		let selectedObj = this.tableService.objs.filter(el=> el['id'] == selectedLineId)[0];

		if (this.selectedLines.filter(el=>el['id'] == selectedObj['id']).length == 0){
			this.selectedLines.push(selectedObj);
		}else{
			let objPosition = 0;

			this.selectedLines.forEach((el, i)=>{
				if (el['id'] == selectedObj['id']){
					objPosition = i;
				}
			})
			this.selectedLines.splice(objPosition, 1)
		}
		this.lineChanges.emit(this.selectedLines);
	}

	ngOnInit(): void {
		this.tableService.retrieveData(this.retrieveUrl, this.basicValue);
	}


	constructor(protected tableService: TableService){
	}
}
