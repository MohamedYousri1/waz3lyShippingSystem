import { MessageService } from 'primeng/api';
import { Validators, FormBuilder } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  providers : [MessageService] ,
  selector: 'app-global-weight',
  templateUrl: './global-weight.component.html',
  styleUrls: ['./global-weight.component.css']
})
export class GlobalWeightComponent implements OnInit {

  constructor(
    private modal : NgbModal ,
    private usedService :  ClientsService ,
    private fb : FormBuilder ,
    private x : MessageService
  ) { }

  ngOnInit(): void {

    this.get_weights();
    this.weightFormBuild() ;
  }


  catch_obj :any ;
  edit_add(modal , obj){
    this.patch();
    this.modal.open(modal , {size:'lg' , backdrop : 'static',keyboard : false})
    this.catch_obj=obj
  }

  // getting weights
  allWeights : any[] = [] ;
  get_weights()
  {
    this.usedService.get_globalWeight().subscribe((res  : any ) =>  {
      this.allWeights =  res.weight ;
      console.log(this.allWeights);
    })
  }


  weightForm : any;
  weightFormBuild()
  {
    this.weightForm = this.fb.group({
      limit : [null ,  Validators.required] ,
      price : [null ,  Validators.required]
    })
  }

// patching value of Weight Global
patch()
{
  this.weightForm.patchValue({
    limit : this.allWeights[0].limit  ,
    price : this.allWeights[0].price

  })
}

  saveWeight()
{
debugger

  this.usedService.updateWeight(this.weightForm.value).subscribe(res => {
  console.log(res);
    this.get_weights() ;
    this.modal.dismissAll()
    this.x.add({key: 'myKey5', severity:'success', summary: 'Notification', detail: 'تم الحفظ بنجاح'});

  },err=>  {
    console.log(err);
  })
}


}
