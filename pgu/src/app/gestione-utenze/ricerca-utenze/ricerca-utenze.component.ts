import { Component, EventEmitter, Output } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { FormControl } from '@angular/forms';

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

interface objInterface {
  [key: string]: FormControl;
}

@Component({
  selector: 'app-ricerca-utenze',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './ricerca-utenze.component.html',
  styleUrl: './ricerca-utenze.component.scss'
})
export class RicercaUtenzeComponent {
  @Output() fetchedData = new EventEmitter<objInterface>
  @Output() dataAsked = new EventEmitter<boolean>

  form1: dynamicFormComponent[] = [
    {
      id: "cname",
      label: "Nome",
      type: "text",
      required: true,
      controls: ["^.{3,15}$"],
      value: "",
      disabled: false
    },{
      id: "ccognome",
      label: "Cognome",
      type: "text",
      required: true,
      controls: ["^.{3,15}$"],
      value: "",
      disabled: false
    }
  ];
  form2: dynamicFormComponent[] = [
    {
      id: "ccodicefiscale",
      label: "Codice Fiscale",
      type: "text",
      required: true,
      controls: ["^.{3,15}$"],
      value: "",
      disabled: false
    }
  ];
  form3: dynamicFormComponent[] = [
    {
      id: "cemail",
      label: "Email",
      type: "text",
      required: true,
      controls: ["^.{3,15}$"],
      value: "",
      disabled: false
    }
  ];

  catchData(e:any){
    this.fetchedData.emit(e);
  }

  handleSubmit(e: any){
    this.dataAsked.emit(true);
  }
}
