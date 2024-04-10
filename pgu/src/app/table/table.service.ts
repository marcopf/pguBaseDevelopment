import { Injectable } from '@angular/core';
import { GenericObject } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class TableService {  
  objs:GenericObject[] = []; 
  objsKeys:string[] = [];
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
  
  async retrieveData(url: string, basicValue?: GenericObject[]) {
    if (basicValue != undefined){
      this.objs = this.keyExpander(basicValue, 'attributes');
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
