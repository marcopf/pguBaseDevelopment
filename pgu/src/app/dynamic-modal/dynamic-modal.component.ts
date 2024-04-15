import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '../dynamicForm/dynamic-form.component';
import { DynamicModalService } from './dynamic-modal.service';
import { GenericServiceService } from '../generic-service.service';
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
	showForm: boolean = false;


	async modalClick() {
		this.showForm = true;
		if (this.metaDataUrl == null)
			return;
		this.userformService.getUserData(this.metaDataUrl);
		if (typeof document !== 'undefined') {
			try {
				const bootstrap = await import('bootstrap');
				const modal = new bootstrap.Modal(this.modalElement.nativeElement, { keyboard: false });
				const duptThis = this;

				modal.show();

				this.modalElement.nativeElement.addEventListener("hidden.bs.modal", ()=>{
					duptThis.showForm = false;
				})
			} catch (error) {
				console.error('Error loading Bootstrap:', error);
			}
		}
	}

	 async handleSubmit(e: any){
		let keys = Object.keys(e);
		let obj: any = {
			attributes: {

			}
		}

		keys.forEach((key: string)=>{
			if (key == 'username' || key == 'firstName' || key == 'lastName' || key == 'email'){
				obj[key] = e[key];
			}
			else{
				if (Array.isArray(e[key]))
					obj.attributes[key] = e[key];
				else
					obj.attributes[key] = [e[key]];
			}
		})
		
		const res =	await fetch(`${this.submitUrl}`,	{
			method:	'POST',
			headers: {
				'Content-Type':	'application/json',
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
			},
			body: JSON.stringify(obj)
		});
		this.genericService.checkStatus(res.status);
	}

	constructor(protected userformService: DynamicModalService, private genericService: GenericServiceService){

	}
}
