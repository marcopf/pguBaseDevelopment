import { Injectable } from '@angular/core';

interface data {
  [key:string]: string
}

@Injectable({
  providedIn: 'root'
})
export class TableService {  
  objs:data[] = []; 
  objsKeys:string[] = [];

  
  async retrieveData(url: string) {
    const res = await fetch(url);
    let resJson;

    try{
      resJson = await res.json();
    }catch(e){
      this.objs = [];
    }
    this.objs = resJson;
    console.log(this.objs)
    this.objsKeys = Object.keys(this.objs[0]);
  }
  constructor() {
  }
}
