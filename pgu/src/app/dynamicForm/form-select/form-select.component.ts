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
  @Input() label!: string;
  @Input() tag!: string;
  @Input() key!: string;
  @Input() options!: string[] | undefined;
  @Input() formC!: FormControl;
  @Input() required!: boolean;
  requiredLabel = "";

  ngOnChanges(): void {
    if (this.required)
      this.requiredLabel = " *";
  }
}
