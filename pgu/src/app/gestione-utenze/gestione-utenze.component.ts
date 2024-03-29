import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { DynamicFormComponent } from '../dynamicForm/dynamic-form.component';
import { RicercaUtenzeComponent } from './ricerca-utenze/ricerca-utenze.component';
import { SpinnerComponent } from '../table/spinner/spinner.component';

interface data {
  [key:string]: string
}

@Component({
  selector: 'app-gestione-utenze',
  standalone: true,
  imports: [TableComponent, DynamicFormComponent, RicercaUtenzeComponent, SpinnerComponent],
  templateUrl: './gestione-utenze.component.html',
  styleUrl: './gestione-utenze.component.scss'
})
export class GestioneUtenzeComponent {
  fetchedData: data[] | undefined = undefined;
  isLoading: boolean = false;

  handleData(e: any){
    this.fetchedData = e;
    console.log(this.fetchedData)
    this.isLoading = false;
  }

  handleSubmit(e: any){
    this.isLoading = true;    
    this.fetchedData = undefined;
  }
}
