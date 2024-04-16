import { Component, ElementRef, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { DynamicFormComponent } from '../dynamicForm/dynamic-form.component';
import { DynamicModalService } from './dynamic-modal.service';
import { GenericServiceService } from '../generic-service.service';
import { DynamicFormType } from '../Interfaces';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-dynamic-modal',
	standalone: true,
	imports: [DynamicFormComponent, NgbModule],
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

	private modalService = inject(NgbModal);

	open(content: TemplateRef<any>) {
		this.showForm = true;
		if (this.metaDataUrl == null)
			return;
		this.userformService.getUserData(this.metaDataUrl, this.formExtension);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
	}

	createUser(userInsertedData: any){
		if (!this.submitUrl)
			alert('Error: bad submit url.');

		this.userformService.createNewUser(userInsertedData, this.submitUrl!, this.modalService)
	}

	constructor(protected userformService: DynamicModalService){

	}
}
