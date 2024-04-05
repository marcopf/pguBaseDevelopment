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
  contentLoaded: boolean = false;

  
  async retrieveData(url: string, basicValue?: data[]) {
    if (basicValue != undefined){
      this.objs = basicValue;
      if (basicValue.length > 0)
        this.objsKeys = Object.keys(this.objs[0]);
      this.contentLoaded = true;
      return ;
    }
    // const res = await fetch(url);
    // let resJson;

    // try{
    //   resJson = await res.json();
    //   this.contentLoaded = true;
    //   console.log(this.contentLoaded)
    // }catch(e){
    //   this.objs = [];
    // }
    // this.objs = resJson;
    // this.objsKeys = Object.keys(this.objs[0]);
  }
  constructor() {
  }
}
