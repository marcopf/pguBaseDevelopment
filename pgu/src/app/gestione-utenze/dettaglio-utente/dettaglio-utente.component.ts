import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormComponent } from '../../dynamicForm/dynamic-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import URL from '../../../assets/Url/url';
import { UserInfoService } from './user-info.service';

@Component({
  selector: 'app-dettaglio-utente',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './dettaglio-utente.component.html',
  styleUrl: './dettaglio-utente.component.scss'
})
export class DettaglioUtenteComponent implements OnInit, OnDestroy{
  selectedUserId: string = '';
  userForm: DynamicFormComponent[] = [];
  contentLoaded: boolean = false;

  ngOnInit(): void {
    let idFromParams = this.activatedRoute.snapshot.queryParams['id'];
    this.selectedUserId = idFromParams;
    this.userInfoService.fillCurrentForm(this.selectedUserId)
  }

  ngOnDestroy(): void {
    this.userInfoService.formMetaData = [];
    this.userInfoService.userData = {};
    this.userInfoService.unexpandedUserData = {};
    this.userInfoService.contentLoaded = false;
    this.userInfoService.userId = '';
  }

  constructor(private activatedRoute: ActivatedRoute, protected userInfoService: UserInfoService){
  }
}
