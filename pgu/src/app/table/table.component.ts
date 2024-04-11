import { Component, Input, OnInit, Output } from '@angular/core';
import { TableService } from './table.service';
import { EventEmitter } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { GenericObject, TableConfig } from '../Interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';


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
	menustate: 'present' | 'notPresent' = 'present';

	/**
	 * 
	 * @param e 
	 */
	updateSelected(e: any){
		let selectedLine = e.target;

		//il format id aspettato e' del tipo checkbox-idRelativo con lo split[1] seleziono solo la parte relativa all'id
		let selectedLineId = selectedLine.getAttribute('id').split("-")[1];

		//tramite il metodo filter selezione dall'array di partenza l'elemento richiesto
		let selectedObj = this.tableService.objs.filter(el=> el['id'] == selectedLineId)[0];

		//controllo se l'elemento selezionato e' gia presente nell'array che verra' emesso
		if (this.selectedLines.filter(el=>el['id'] == selectedObj['id']).length == 0){

			//aggiungo l'oggetto all'array che verra' poi emesso
			this.selectedLines.push(selectedObj);
		}else{

			//creo la variabile che salvera' la posizione dell'elemento selezionato all'interno dell'array
			let objPosition = 0;

			//cerco l'elemento
			this.selectedLines.forEach((el, i)=>{
				if (el['id'] == selectedObj['id']){
					objPosition = i;
				}
			})

			//elimino l'elemento trovato dall'array
			this.selectedLines.splice(objPosition, 1)
		}

		//emetto la lista aggiornata al componente padre
		this.lineChanges.emit(this.selectedLines);
	}

	ngOnInit(): void {
		this.tableService.retrieveData(this.retrieveUrl, this.basicValue);
	}


	constructor(protected tableService: TableService){
	}
}
