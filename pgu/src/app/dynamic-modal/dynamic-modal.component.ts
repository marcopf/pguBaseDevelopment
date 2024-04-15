import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../dynamicForm/dynamic-form.component';
import { DynamicModalService } from './dynamic-modal.service';
import { GenericServiceService } from '../generic-service.service';
import { DynamicFormType } from '../Interfaces';
import { Router } from '@angular/router';
import URL from '../../assets/Url/url';
@Component({
	selector: 'app-dynamic-modal',
	standalone: true,
	imports: [DynamicFormComponent],
	templateUrl: './dynamic-modal.component.html',
	styleUrl: './dynamic-modal.component.scss'
})
export class DynamicModalComponent {
	@ViewChild('modalElement') modalElement! :ElementRef;
	@Input() metaDataUrl: string | null = null;	
	@Input() submitUrl: string | null = null;	
	@Input() modalBtn: string = 'CLICCA';
	@Input() modalTitle: string = '';
	@Input() btnStyle: string = "btn p-0";
	@Input() icon: string | null = null;
	@Input() formExtension: DynamicFormType[] = [];

	modalControl: any;
	showForm: boolean = false;

	async modalClick() {
		this.showForm = true;
		if (this.metaDataUrl == null)
			return;
		this.userformService.getUserData(this.metaDataUrl, this.formExtension);
		if (typeof document !== 'undefined') {
			try {
				const bootstrap = await import('bootstrap');
				this.modalControl = new bootstrap.Modal(this.modalElement.nativeElement, { keyboard: false });
				const duptThis = this;

				this.modalControl.show();

				this.modalElement.nativeElement.addEventListener("hidden.bs.modal", ()=>{
					duptThis.showForm = false;
				})
			} catch (error) {
				console.error('Error loading Bootstrap:', error);
			}
		}
	}

	createUser(userInsertedData: any){
		if (!this.submitUrl)
			alert('Error: bad submit url.');

		this.userformService.createNewUser(userInsertedData, this.submitUrl!, this.modalControl)
	}

	constructor(protected userformService: DynamicModalService, private genericService: GenericServiceService, private router: Router){

	}
}
