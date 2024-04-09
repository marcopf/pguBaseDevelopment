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

  keyExpander(dataList: data[], keyToExpand: string): data[]{
    let expandedObj: data[];

    if (dataList[0][keyToExpand] === undefined){
      return [];
    }
    dataList.forEach((obj, index)=>{
      let tempMemory = obj[keyToExpand] as unknown as data;
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
  
  async retrieveData(url: string, basicValue?: data[]) {
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
