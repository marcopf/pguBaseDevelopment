import { Injectable } from '@angular/core';
import URL from '../../assets/Url/url';

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
    const res = await fetch(URL.gestione_utenti.CERCA_UTENTI + queryParamsPart, {
      method: 'GET',
    });

    let jsonRes = {
      content: [],
      totalElements: 0,
      totalPages: 0,
      number: 1,
      size: 10,
      numberOfElements: 0
    };

    try {
      jsonRes = await res.json();
    } catch (error) {
      console.log(error);
    }
    return jsonRes;
  }

  constructor() { }
}
