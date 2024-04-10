import { Injectable } from '@angular/core';
import URL from '../../../assets/Url/url';
import { GenericObject } from '../../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  formMetaData: any[] = [];
  userData: any = {};
  contentLoaded: boolean = false;

  keyExpander(dataList: GenericObject[], keyToExpand: string): GenericObject[]{
    if (dataList[0][keyToExpand] === undefined){
      return [];
    }
    dataList.forEach((obj)=>{
      let tempMemory = obj[keyToExpand] as unknown as GenericObject;
      let keys = Object.keys(tempMemory);
      let objKeys = Object.keys(obj);

      objKeys.forEach(key=>{
        if (key[0] == '_' && key != '_id'){
          delete obj[key];
        }
      })
      delete obj[keyToExpand];
      keys.forEach(key=>{
        obj[key] = tempMemory[key];
      })
      
    })
    return dataList;
  }

  async getFormMetadata(){
    const res = await fetch(URL.dettaglio_utenze.GET_FORM_METADATA, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
    let exitStatus = true;

    try {
      this.formMetaData = this.keyExpander(await res.json(), 'validator');
    } catch (error) {
      console.log(error)
      exitStatus = false;
    }
    return exitStatus;
  }

  async getUserData(id: string){
    const res = await fetch(`${URL.dettaglio_utenze.GET_USER_DATA}${id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
    let exitStatus = true;

    try {
      this.userData = this.keyExpander(await res.json(), 'attributes');
    } catch (error) {
      console.log(error)
      exitStatus = false;
    }
    return exitStatus;
  }

  async fillCurrentForm(id: string){
    const formRes = this.getFormMetadata();
    const userDataRes =  this.getUserData(id);
    const responses = await Promise.all([formRes, userDataRes]);

    if (!responses.every(el=>el === true))
      return ;
    this.contentLoaded = true;
    Object.keys(this.userData).forEach(key=>{
      this.formMetaData.forEach((element: any) => {
        if (element.id == key){
          element.value = this.userData[key];
        }
      });
    })
    console.log(this.formMetaData)
  }
  constructor() { }
}
