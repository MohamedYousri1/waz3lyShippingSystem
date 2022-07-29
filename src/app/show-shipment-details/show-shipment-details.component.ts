import { RepresentativeService } from './../services/representative.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from './../services/reports.service';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $:any  ;
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-show-shipment-details',
  templateUrl: './show-shipment-details.component.html',
  styleUrls: ['./show-shipment-details.component.css']
})
export class ShowShipmentDetailsComponent implements OnInit {

  products
  catch_id:any
  allData:any


  //paginations
  recourdNumber:any
  row=5
  constructor(
              private ship_ser:ShipmentsService ,
              private x : MessageService  ,
              private  _client:RepresentativeService,
              private modal:NgbModal,
              private _formBuilder: FormBuilder ,
              ) { }

  ngOnInit(): void {

    this.getAllRepresentative() ;
    let main_id  = document.getElementById('shipment_id') ;
    this.build();
      main_id.onchange = ()=> {
        debugger
        if(this.representativeId)
        {
          debugger
        if(this.shipment_id)
        {
          if(this.shipmentIds.indexOf(this.shipment_id) == -1 )
          {
            this.shipmentIds.push(this.shipment_id) ;
            console.log(this.shipmentIds);
            this.get_name(this.shipment_id) ;
            this.shipment_id = '' ;
          }else
          {
          this.x.add({key: 'myKey1', severity:'error', summary: 'Notification ', detail: 'تم اسكان الشحنه من قبل'});
          this.get_name(this.shipment_id) ;
          }

        }else
        {
          debugger
          this.x.add({key: 'myKey1', severity:'info', summary: 'Notification ', detail: 'عفوا , هناك خطا'});
          this.shipment_id = '' ;
          this.shipmentIds.splice(this.shipmentIds[this.shipment_id] , 1 ) ;
        }
      }
      else
    {
      this.x.add({key: 'myKey1', severity:'error', summary: 'Notification ', detail: 'يجب تحديد المندوب'});
      this.shipment_id = '' ;
    }
    }
    $('#shipment_id').focus() ;
    this.changeImg()


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.todayDate =  dd + '/' + mm + '/' + yyyy;
  }

todayDate : any ;

  shipmentIds  : any[] = [];
  myForm : FormGroup ;
  build()
  {
    this.myForm = this._formBuilder.group({
      employee_id: [null, Validators.required] ,
      delivery_date : [null  , Validators.required]
    });
  }

  fillData : boolean =  false ;


  changeImg()
  {
    debugger
    let imgs = ['123' , '456' , '789' , '1010'] ;
    let getImgRandom = Math.floor(Math.random() * imgs.length ) ;
    setInterval(() => {
      // console.log(getImgRandom);
      getImgRandom = Math.floor(Math.random() * imgs.length )
    $('.ship-wrapping img ').attr('src' , `'../../assets/images/${imgs[getImgRandom]}.jpg`)
    }, 10000);

  }

  shipment_id ;

  //get shipments for catch name
  fixedId   ;


  get_name(id){
    this.ship_ser.get_one(id).subscribe(
      res=>{

       if(res !== null )
       {
         this.fixedId =  id  ;
        this.allData=res.shipment ;
        this.fillData = true ;
        console.log(this.allData);
        this.changeImg()
        this.shipment_id = '' ;
       }else{
        this.shipment_id = '' ;
        this.fillData = false  ;
       }
      },err =>  {

        debugger
        console.log(err);
        this.x.add({key: 'myKey1', severity:'info', summary: 'Notification  ', detail: 'عفوا , هناك خطا'});
       this.allData = '' ;
       this.shipmentIds.splice(this.shipmentIds[this.shipment_id] , 1 ) ;
       this.fillData = false ;
      },()=>{
        this.shipment_id = '' ;
      }
    )
  }



  // get  allRepresentative
  allRepresentative
  getAllRepresentative()
  {
    debugger
    return this._client.get_represenative().subscribe(res =>  {
      console.log(res);

      this.allRepresentative = res.representative ;
    })
  }



  addRepresentative()
  {
    debugger
    if(this.allData)
    {
        console.log(this.allData);

      return this.ship_ser.addRepresentative(this.myForm.value , this.allData.id).subscribe(res =>  {
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم التفعيل وتحديد المندوب'});
        this.modal.dismissAll() ;

        debugger
        this.ship_ser.get_one(this.fixedId).subscribe(
          res=>{

           if(res !== null )
           {
            this.allData=res.shipment ;
            this.fillData = true ;
            console.log(this.allData);
            this.changeImg()
            this.shipment_id = '' ;
            this.fixedId = '' ;
           }else{
            this.fillData = false  ;
           }
          },err =>  {
            debugger
            console.log(err);

            this.x.add({key: 'myKey1', severity:'info', summary: 'Notification  ', detail: 'عفوا , هناك خطا'});
            this.shipmentIds.splice(this.shipmentIds[this.shipment_id] , 1 ) ;
           this.allData = '' ;
           this.fillData = false ;
          }
        )


        })

    }
  }


  add_edit(modal,obj){
    debugger
    // this.ship_id = obj.id
    this.modal.open(modal,{size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'

  }

  representativeId : any = null  ;


  // on Respresentative Change
  onRepresentativeChange(id  : any )
  {
    debugger
    this.representativeId  = id ;
    this.shipmentIds = [] ;
  }
  sheetRepresentatives : any[] = []  ;
  today   ;
  printIt()
  {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    this.today = weekday[d.getUTCDay()];
    this.ship_ser.gettingShipmentForRes(this.representativeId).subscribe((res  :any ) => {
      this.sheetRepresentatives  = res.shipment ;
    },err=>  {
      console.log(err);

    },()=> {
      $('#sheetRes').printThis({
        importCSS: true,
        importStyle: false ,
      });
    })


  }
  // Adding Representative At Shipments
  confirmAddingRes()
  {
    debugger
   if(this.representativeId)
   {
    this.ship_ser.addingResToShipment({representative_id : this.representativeId , shipment_id : this.shipmentIds  } ).subscribe(res => {
    this.x.add({key: 'myKey1', severity:'error', summary: 'Notification  ', detail: 'تم تحديد المندوب '});
    this.get_name(this.allData?.id)
    },err=> {
      console.log(err);
    })
   }else
   {
    this.x.add({key: 'myKey1', severity:'error', summary: 'Notification  ', detail: 'يجب تحديد المندوب اولا'});

   }
  }

}
