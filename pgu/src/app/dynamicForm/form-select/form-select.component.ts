import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-select.component.html',
  styleUrl: './form-select.component.scss'
})
export class FormSelectComponent implements OnChanges {
  @Input() options!: string[] | undefined;
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
