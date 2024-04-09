import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';

type dynamicFormComponent = {
  id: string,
  label: string,
  type: string,
  required: boolean
  options?: string [] | undefined,
  controls?: string[],
  value: string,
  disabled: boolean
}

@Component({
  selector: 'app-dettaglio-utente',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './dettaglio-utente.component.html',
  styleUrl: './dettaglio-utente.component.scss'
})
export class DettaglioUtenteComponent implements OnInit{
  selectedUserId: number = -1;
  userForm: dynamicFormComponent[] = [];
  contentLoaded: boolean = false;

  handleSubmit(e:any){
    console.log(e)
  }

  ngOnInit(): void {
    let idFromParams = Number(this.activatedRoute.snapshot.queryParams['id']);
    this.selectedUserId = idFromParams;

    fetch('http://localhost:3000/form').then(res=>{
      return res.json();
    }).then(msg=>{
      this.contentLoaded = true;
      this.userForm = msg as dynamicFormComponent[];
    })
    fetch('http://localhost:3000/values').then(res=>{
      return res.json();
    }).then(msg=>{
    })
  }

  constructor(private activatedRoute: ActivatedRoute){
  }
}
