import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-number',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-number.component.html',
  styleUrl: './form-number.component.scss'
})
export class FormNumberComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() tag: string = '';
  @Input() key: any;
  @Input() formC: FormControl = new FormControl;
  @Input() required: boolean = false;
  requiredLabel = "";

  ngOnChanges(): void {
    if (this.required){
      this.requiredLabel = " *"
    }
  }

  checkError(e: any){
    if (!this.formC.valid){
      e.target.classList.remove("is-valid")
      e.target.classList.add("is-invalid")
    }else{
      e.target.classList.remove("is-invalid")
      e.target.classList.add("is-valid")
    }
  }
}
