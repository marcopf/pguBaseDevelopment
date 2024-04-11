import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { LanguagesService } from '../../../assets/Languages/languages.service';
import { TranslatorPipe } from '../../../assets/Languages/translator.pipe';
import { DynamicFormType, FormControlObjectType } from '../../Interfaces';

@Component({
  selector: 'app-ricerca-utenze',
  standalone: true,
  imports: [DynamicFormComponent, TranslatorPipe],
  templateUrl: './ricerca-utenze.component.html',
  styleUrl: './ricerca-utenze.component.scss'
})
export class RicercaUtenzeComponent {
  @Output() onFormDataAvailable = new EventEmitter<FormControlObjectType>
  @Output() onSearchButtonPressed = new EventEmitter<boolean>
  @Input() outgoingDataUrl: null | string = null;

  form1: DynamicFormType[] = [
    {
      id: "cname",
      label: "Nome",
      type: "TEXT",
      required: true,
      controls: ["^.{3,15}$"],
      value: "ciao",
      disabled: false
    },{
      id: "ccognome",
      label: "Cognome",
      type: "TEXT",
      required: true,
      controls: ["^.{3,15}$"],
      value: "prova",
      disabled: false
    }
  ];
  form2: DynamicFormType[] = [
    {
      id: "ccodicefiscale",
      label: "Codice Fiscale",
      type: "TEXT",
      required: true,
      controls: ["^.{3,15}$"],
      value: "",
      disabled: false
    }
  ];
  form3: DynamicFormType[] = [
    {
      id: "cemail",
      label: "Email",
      type: "TEXT",
      required: true,
      controls: ["^.{3,15}$"],
      value: "",
      disabled: false
    }
  ];

  catchData(e:any){
    this.onFormDataAvailable.emit(e);
  }

  handleSubmit(e: any){
    this.onSearchButtonPressed.emit(true);
  }
  constructor(protected languageServices: LanguagesService){

  }
}
