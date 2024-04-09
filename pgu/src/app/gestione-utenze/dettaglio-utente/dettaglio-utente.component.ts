import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio-utente',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './dettaglio-utente.component.html',
  styleUrl: './dettaglio-utente.component.scss'
})
export class DettaglioUtenteComponent implements OnInit{
  selectedUserId: number = -1;

  handleSubmit(e:any){
    console.log(e)
  }

  ngOnInit(): void {
    let idFromParams = Number(this.activatedRoute.snapshot.queryParams['id']);
    
    if (Number.isNaN(idFromParams)){
      this.router.navigate(['/gestione-utenti'])
      return ;
    }
    this.selectedUserId = idFromParams;
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router){
  }
}
