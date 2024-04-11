import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-pagination',
	standalone: true,
	imports: [],
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
	@Input() totalElements: number = 0;
	@Input() retrievedElements: number = 0;
	@Input() elementsPerPage: number = 0;
	@Input() numberOfPages: number = 0;
	@Input() currentPage: number = 0;
	@Input() padding: number = 1;
	@Input() isTableLoaded: boolean = false;

	@Output() pageSelected = new EventEmitter<number>;
	@Output() elementsPerPageSwitch = new EventEmitter<number>;
	totalElementsArray: number[] = [];

	getAbsValue(num: number){
		return Math.abs(num)
	}
	
	/**
	 * Funzione che si occupa di inviare il dato relativo al numero di elementi per pagina desiderati dall'utente
	 * ogni volta che questo valore viene cambiato
	 *	
	 * @param element - oggetto evento usato per ottenere l'id relativo all'oggetto selezionato dal quale si ricava poi
	 * il numero di elementi richiesti per pagina
	 */
	switchElementPerPage(element: any){
		this.elementsPerPageSwitch.emit(Number(element.target.getAttribute('id').split('-')[1]))
	}

	/**
	 * Funzione che si occupa di inviare il dato relativo al numero di pagina per pagina desiderato dall'utente
	 * ogni volta che questo valore viene cambiato
	 *	
	 * @param element - oggetto evento usato per ottenere l'id relativo all'oggetto selezionato dal quale si ricava poi
	 * il numero della pagina desiderata
	 */
	emitSelectedPage(element: any){
		this.pageSelected.emit(Number(element.currentTarget.getAttribute('id').split('-')[1]));
	}

	/**
	 * Funzione che viene chiamata all'inizio del ciclo di vita del componente.
	 * Crea un'array a partire dal numero di pagine che il server ci ha restituito formattandolo
	 * del tipo [1, 2, ..., numero_di_pagina_massimo] per poterno iterare nell'template html creando cosi
	 * i link alle varie pagine disponibili
	 */
	ngOnInit(){
		this.totalElementsArray = Array.from(Array(this.numberOfPages).keys());
	}
}
