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
	@Input() tag: string = '';
	@Input() key: any;
	@Input() formC: FormControl = new FormControl;
	@Input() required: boolean = false;
	requiredLabel = "";

	/**
	 * Funzione che viene richimata alla pressione di un tasto,
	 * controlla sel l'input attuale e' valido e mostra un
	 * feedback in base al riscontro
	 * 
	 * @param input
	 * Rappresenta l'oggetto che ha scatenato l'evento, viene
	 * utilizzato da target per aggiornare il feedback grafico                  
	 */
	checkError(input: any){
		if (!this.formC.valid){
			input.target.classList.remove("is-valid")
			input.target.classList.add("is-invalid")
		}else{
			input.target.classList.remove("is-invalid")
			input.target.classList.add("is-valid")
		}
	}

	/**
	 * Funzione che viene richiamata ogni volta che il le variabili in input
	 * subiscono un cambiamento, va semplicemente ad aggiungere un asterisco
	 * nei campi richiesti
	 */
	ngOnChanges(): void {
		if (this.required){
			this.requiredLabel = " *"
		}
	}
}
