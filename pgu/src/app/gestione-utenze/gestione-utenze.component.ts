import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { DynamicFormComponent } from '../dynamicForm/dynamic-form.component';
import { RicercaUtenzeComponent } from './ricerca-utenze/ricerca-utenze.component';
import { SpinnerComponent } from '../table/spinner/spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RetrieveUserDataService } from './retrieve-user-data.service';

interface data {
  [key:string]: string
}

@Component({
  selector: 'app-gestione-utenze',
  standalone: true,
  imports: [TableComponent, DynamicFormComponent, RicercaUtenzeComponent, SpinnerComponent, PaginationComponent],
  templateUrl: './gestione-utenze.component.html',
  styleUrl: './gestione-utenze.component.scss'
})
export class GestioneUtenzeComponent {
	fetchedData: data[] | undefined = undefined;
	isLoading: boolean = false;
	isTableLoaded: boolean = false;
	savedQueryParams: any = undefined;
	paginationInfo = {
		size: 10,
		page: 1
	}
	currentPage = 1;

  	/**
  	  *  Effettua la chiamata per ottenere le info relative alla tabella che mostra i risultati della ricerca
  	  * 
  	  *  @param params         - rappresenta l'oggetto che contiene i query params relativi alla ricerca
  	  *  @param paginationInfo - rappresenta l'oggetto che contiene i query params relativi alla paginazione
  	  */
  	getUsersInfo(params: any, paginationInfo?: any){
		this.searchUserService.searchUser(params, paginationInfo).then(el=>{
		  this.fetchedData = el.content as data[];
		  if (this.fetchedData.length > 0){
			this.isTableLoaded = true;
		  }
		  this.isLoading = false;
		})
  	}

  	/**
	  *  Questa funzione gestisce l'aggiornamento della tabella nel caso in cui l'utente voglia cambiare
	  *  la PAGINA CORRENTE andando a cambiare il valore relativo alla pagina corrente nella variabile <paginationInfo>
	  *  e effettuando una nuova chiamata per ottenere i dati relativi
	  * 
	  * @param requestedPageNumber - rappresenta la pagina che l'utente ha selezionato nel componente <app-pagination>
	  */
  	makePaginationRequest(requestedPageNumber: any){
		this.isLoading = true;    
		this.fetchedData = undefined;
		this.isTableLoaded = false;

		if (this.savedQueryParams != undefined){
			this.paginationInfo.page = requestedPageNumber;
			this.currentPage = requestedPageNumber;
			this.getUsersInfo(this.savedQueryParams, this.paginationInfo);
		}
  	}

  	/**
	  *  Questa funzione gestisce l'aggiornamento della tabella nel caso in cui l'utente voglia cambiare
	  *  la PAGINA CORRENTE andando a cambiare il valore relativo alla pagina corrente nella variabile <paginationInfo>
	  *  e effettuando una nuova chiamata per ottenere i dati relativi
	  * 
	  * @param pageSize - rappresenta il nuovo numero di elementi per pagina che l'utente ha selezionato
	  */
	changePageSize(pageSize: number){
		this.isLoading = true;    
		this.fetchedData = undefined;
		this.isTableLoaded = false;
		
		if (this.savedQueryParams != undefined){
			this.paginationInfo.size = pageSize;
			this.getUsersInfo(this.savedQueryParams, this.paginationInfo);
		}
	}

  	/**
  	  *  Questa funzione viene chiamata quando l'utente ha correttamente inserito le informazione
  	  *  richieste per la ricerca e il componente <app-gestione-utenze> ha a dispozione le 
  	  *  informazione inserite dall'utente, queste verranno elaborate per costruire una stringa 
  	  *  reppresentante i query params 
  	  * 
  	  *  @param searchParams - rappresenta l'oggetto che contiene i query params relativi alla ricerca
  	  */
	handleData(searchParams: any){
		this.isLoading = false;
		this.savedQueryParams = searchParams;
		this.getUsersInfo(this.savedQueryParams, this.paginationInfo);
	}

  	/**
  	  *  Serve lo scopo di effettuare un "refresh" della tabella ogni volta che l'utente preme il
  	  *  pulsante di richerca
  	  * 
  	  *  @param _ - dummy params
  	  */
  	handleSubmit(_: any){
		this.isLoading = true;    
		this.fetchedData = undefined;
		this.isTableLoaded = false;
  	}

  constructor(private searchUserService: RetrieveUserDataService){

  }
}
