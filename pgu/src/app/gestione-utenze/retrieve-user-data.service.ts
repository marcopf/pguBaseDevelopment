import { Injectable } from '@angular/core';

const SEARCH_USER = 'http://localhost:3000/form';

@Injectable({
  providedIn: 'root'
})
export class RetrieveUserDataService {

  async searchUser(obj: any, paginationInfo?: any){
    let keys = Object.keys(obj);
    let queryParamsPart = '?';

    //partendo dall'oggeto <obj> creo i query params necessari per la ricerca
    keys.forEach((key, index)=>{
      if (index != 0){
        queryParamsPart += `&${key}=${obj[key]}`
      }else{
        queryParamsPart += `${key}=${obj[key]}`
      }
    })

    //similmente alla sezione di ricerca, creo i query params che definisco la paginazione
    if (paginationInfo != undefined){
      queryParamsPart += `&page=${paginationInfo.page}&size=${paginationInfo.size}`
    }

    //effttuo la chimata all'endpoint agganciando tutti i query params elaborati
    const res = await fetch(SEARCH_USER + queryParamsPart, {
      method: 'POST',
    });

    let jsonRes = {content: []};

    try {
      jsonRes = await res.json();
    } catch (error) {
      console.log(error);
    }
    return jsonRes;
  }
  
  constructor() { }
}
