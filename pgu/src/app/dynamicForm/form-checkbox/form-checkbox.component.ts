import { Component, Input, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-checkbox.component.html',
  styleUrl: './form-checkbox.component.scss'
})
export class FormCheckboxComponent implements OnChanges {
  @Input() label: string = '';
  @Input() tag: string = '';
  @Input() key: any;
  @Input() formC: FormControl = new FormControl;
  @Input() required: boolean = false;
  requiredLabel = "";

  ngOnChanges(): void {
    if (this.required)
      this.requiredLabel = " *";
  }
}
