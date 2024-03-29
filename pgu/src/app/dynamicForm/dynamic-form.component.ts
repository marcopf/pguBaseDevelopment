import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { FormToggleComponent } from './form-toggle/form-toggle.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FormTextComponent } from './form-text/form-text.component';
import { FormSelectComponent } from './form-select/form-select.component';
import getDynamicForm from './API/getDynamicForm';
import { SpinnerComponent } from '../table/spinner/spinner.component';

interface objInterface {
  [key: string]: FormControl;
}

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
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormToggleComponent, FormCheckboxComponent, FormDateComponent, FormTextComponent, FormSelectComponent, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit{
  @Input() incomingData: string = "";
  @Input() outgoingData: string = "";
  @Input() formTitle: string = "";
  @Input() formBtn: string = "";
  @Input() basicValue:  dynamicFormComponent[] | null = null;
  @Output() fetchedData = new EventEmitter<objInterface>;
  @Output() dataAsked = new EventEmitter<boolean>;

  tag: string = "create-";
  addUserForm = new FormGroup({});
  controlsReference: objInterface = {};
  objs: dynamicFormComponent[] = [];
  formGroupObj: objInterface = {};
  contentLoaded: boolean = false;

  onSubmit(){
    let formValues = this.addUserForm.value;
    
    this.dataAsked.emit(true);
    fetch(this.outgoingData, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(data=>{
      return data.json()
    })
    .then(parsedData=>{
      this.fetchedData.emit(parsedData)
    })
  }

  formInit(){
    getDynamicForm(this.incomingData).then(res=>{
      this.contentLoaded = true;
      this.objs = res;
      this.formGroupObj = this.formFields.createFormGroupObj(this.objs);
      this.addUserForm = new FormGroup(this.formGroupObj);
    })
    console.log(this.basicValue)
  }

  ngOnInit(): void {
    if (this.basicValue == null){
      this.formInit();
      return ;
    }
    this.contentLoaded = true;
    this.objs = this.basicValue;
    this.formGroupObj = this.formFields.createFormGroupObj(this.objs);
    this.addUserForm = new FormGroup(this.formGroupObj);
  }

  constructor(protected formFields: DynamicFormService){
  }
}
