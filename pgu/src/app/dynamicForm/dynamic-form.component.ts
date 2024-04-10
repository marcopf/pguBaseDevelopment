import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { FormToggleComponent } from './form-toggle/form-toggle.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormDateComponent } from './form-date/form-date.component';
import { FormTextComponent } from './form-text/form-text.component';
import { FormSelectComponent } from './form-select/form-select.component';
import getDynamicForm from './API/getDynamicForm';
import { SpinnerComponent } from '../table/spinner/spinner.component';
import { FormNumberComponent } from './form-number/form-number.component';
import { DynamicFormType, FormControlObjectType } from '../Interfaces';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [FormToggleComponent, FormCheckboxComponent, FormDateComponent, FormTextComponent, FormSelectComponent, ReactiveFormsModule, SpinnerComponent, FormNumberComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit, OnChanges{
  @Input() incomingData: string = "";
  @Input() formTitle: string = "";
  @Input() formBtn: string = "";
  @Input() basicValue:  DynamicFormType[] | null = null;
  @Output() formData = new EventEmitter<FormControlObjectType>;
  @Output() dataAsked = new EventEmitter<boolean>;
  @Input() contentLoaded: boolean = false;

  tag: string = "create-";
  addUserForm = new FormGroup({});
  controlsReference: FormControlObjectType = {};
  formGroupObj: FormControlObjectType = {};

  onSubmit(){
    this.dataAsked.emit(true);
    this.formData.emit(this.addUserForm.value)
  }

  formInit(){
    getDynamicForm(this.incomingData).then(res=>{
      this.contentLoaded = true;
      this.basicValue = res;
      this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue!);
      this.addUserForm = new FormGroup(this.formGroupObj);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.basicValue == null){
      this.formInit();
      return ;
    }
    this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue);
    this.addUserForm = new FormGroup(this.formGroupObj);
  }

  ngOnInit(): void {
    if (this.basicValue == null){
      this.formInit();
      return ;
    }
    this.formGroupObj = this.formFields.createFormGroupObj(this.basicValue);
    this.addUserForm = new FormGroup(this.formGroupObj);
  }

  constructor(protected formFields: DynamicFormService){
  }
}
