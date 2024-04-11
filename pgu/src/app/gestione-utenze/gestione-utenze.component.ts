import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { DynamicFormComponent } from '../dynamicForm/dynamic-form.component';
import { RicercaUtenzeComponent } from './ricerca-utenze/ricerca-utenze.component';
import { SpinnerComponent } from '../table/spinner/spinner.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RetrieveUserDataService } from './retrieve-user-data.service';
import { GenericObject, Pagination, TableConfig } from '../Interfaces';

@Component({
  selector: 'app-gestione-utenze',
  standalone: true,
  imports: [TableComponent, DynamicFormComponent, RicercaUtenzeComponent, SpinnerComponent, PaginationComponent],
  templateUrl: './gestione-utenze.component.html',
  styleUrl: './gestione-utenze.component.scss'
})
export class GestioneUtenzeComponent {
	fetchedData: GenericObject[] | undefined = undefined;
	isLoading: boolean = false;
	isTableLoaded: boolean = false;
	savedQueryParams: any = undefined;
	paginationInfo: Pagination = {
		size: 10,
		page: 0,
		totalElements: 0,
		retrievedElements: 0,
		numberOfPages: 0
	}
	tableConfig: TableConfig = {
		incomingDataLink: null,
		outgoingDataLink: null,
		type: "link",
		text: "Dettagli",
		hasCheckBox: false
	  }

  	/**
  	  *  Effettua la chiamata per ottenere le info relative alla tabella che mostra i risultati della ricerca
  	  * 
  	  *  @param params         - rappresenta l'oggetto che contiene i query params relativi alla ricerca
  	  *  @param paginationInfo - rappresenta l'oggetto che contiene i query params relativi alla paginazione
  	  */
  	getUserList(params: any, paginationInfo: Pagination){
		this.searchUserService.searchUser(params, paginationInfo).then(response=>{
			this.fetchedData = response.content as GenericObject[];
			paginationInfo.totalElements = Number(response.totalElements);
			paginationInfo.numberOfPages = Number(response.totalPages);
			paginationInfo.page = Number(response.number);
			paginationInfo.size = Number(response.size);
			paginationInfo.retrievedElements = response.numberOfElements;
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
  	changePageNumber(requestedPageNumber: number){
		this.isLoading = true;    
		this.fetchedData = undefined;
		this.isTableLoaded = false;

		if (this.savedQueryParams != undefined){
			this.paginationInfo.page = requestedPageNumber;
			this.getUserList(this.savedQueryParams, this.paginationInfo);
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
		this.paginationInfo.page = 0;

		if (this.savedQueryParams != undefined){
			this.paginationInfo.size = pageSize;
			this.getUserList(this.savedQueryParams, this.paginationInfo);
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
	handleIncomingFormData(searchParams: any){
		this.isLoading = false;
		this.savedQueryParams = searchParams;
		this.getUserList(this.savedQueryParams, this.paginationInfo);
	}

  	/**
  	  *  Serve lo scopo di effettuare un "refresh" della tabella ogni volta che l'utente preme il
  	  *  pulsante di richerca
  	  * 
  	  *  @param _ - dummy params
  	  */
  	handleSearchUserBtnPress(_: any){
		this.isLoading = true;    
		this.fetchedData = undefined;
		this.isTableLoaded = false;
		this.paginationInfo.page = 0;
		this.paginationInfo.size = 10;
  	}

  constructor(private searchUserService: RetrieveUserDataService){

  }
}
