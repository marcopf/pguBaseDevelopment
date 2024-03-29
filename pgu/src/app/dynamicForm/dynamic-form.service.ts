import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

function createControl(element: dynamicFormComponent): FormControl{
  let validators = [];
  
  if (element.required){
    validators.push(Validators.required);
  }
  if (element.controls != undefined){
    element.controls.forEach(regex=>{
      validators.push(Validators.pattern(regex))
    })
  }
  if (element.type == 'checkbox' || element.type == 'toggle')
    return (new FormControl({value: element.value == 'true' ? true : false, disabled: element.disabled}, validators));
  return (new FormControl({value: element.value, disabled: element.disabled}, validators));
}

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  createFormGroupObj(elements: dynamicFormComponent[]){
    let obj: objInterface = {};
  
    elements.forEach((el: dynamicFormComponent)=>{
      if (el.id === "dummy")
        return ;

      obj[el.id] = createControl(el);
    })
    return (obj);
  }
}
