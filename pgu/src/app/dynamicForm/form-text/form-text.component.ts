import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-text',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-text.component.html',
  styleUrl: './form-text.component.scss'
})
export class FormTextComponent implements OnChanges {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() tag: string = '';
  @Input() key: any;
  @Input() formC: FormControl = new FormControl;
  @Input() required: boolean = false;
  requiredLabel = "";

  checkError(e: any){
    if (!this.formC.valid){
      e.target.classList.remove("is-valid")
      e.target.classList.add("is-invalid")
    }else{
      e.target.classList.remove("is-invalid")
      e.target.classList.add("is-valid")
    }
  }

  ngOnChanges(): void {
    if (this.required){
      this.requiredLabel = " *"
    }
  }
}
