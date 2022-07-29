import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatchItemService {
  barnch_obj:any
  constructor() { }
  



  get_branch(branch){
    this.barnch_obj=branch
  }
  send_branch(){
    return this.barnch_obj
  }
  
}
