import { Component, Input, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-toggle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-toggle.component.html',
  styleUrl: './form-toggle.component.scss'
})
export class FormToggleComponent implements OnChanges{
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
