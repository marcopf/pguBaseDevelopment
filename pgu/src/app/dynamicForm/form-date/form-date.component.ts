import { Component, Input, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';


@Component({
  selector: 'app-form-date',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-date.component.html',
  styleUrl: './form-date.component.scss'
})
export class FormDateComponent implements OnChanges {
  @Input() label!: string;
  @Input() tag!: string;
  @Input() key!: string;
  @Input() formC!: FormControl;
  @Input() required!: boolean;
  requiredLabel = "";

  ngOnChanges(): void {
    if (this.required)
      this.requiredLabel = " *";
  }
}
