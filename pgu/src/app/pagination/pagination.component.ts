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
  @Input() elementsPerPage: number = 0;
  @Input() numberOfPages: number = 0;
  @Input() currentPage: number = 1;
  @Input() padding: number = 1;
  @Input() isTableLoaded: boolean = false;

  @Output() pageSelected = new EventEmitter<number>;
  @Output() elementsPerPageSwitch = new EventEmitter<number>;
  totalElementsArray: number[] = [];

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
  ngOnInit(){
    console.log(this.currentPage, this.padding, this.totalElements)
    this.totalElementsArray = Array.from(Array(this.numberOfPages).keys()).map((el)=>el + 1)
  }
}
