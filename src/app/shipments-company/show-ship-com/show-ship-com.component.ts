import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentsCompanyService } from './../../services/shipments-company.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RepresentativeService } from './../../services/representative.service';
// import { Base64ToGallery, Base64ToGalleryOriginal } from '@ionic-native/base64-to-gallery';
// import { BarcodeScanner, BarcodeScannerOriginal } from '@ionic-native/barcode-scanner';
import { ngxCsv } from 'ngx-csv';
import { first } from 'rxjs/operators';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
declare var $:any ;
import * as XLSX from 'xlsx';
import { StoragesService } from 'src/app/services/storages.service';


declare var $:any ;
@Component({
  selector: 'app-show-ship-com',
  templateUrl: './show-ship-com.component.html',
  styleUrls: ['./show-ship-com.component.css']
})
export class ShowShipComComponent implements OnInit {

  @ViewChild ('depTb7')
  depTb7  : any

  title = 'app';
  elementType = 'url';
  user_id : any ;
  value = '';
  //For Get Data And Displed In DataTable
  List:any[]=[];
  //pagination
  rows = 5;
  recourdNumber:number;
  //catch id to send it to modal
  catch_obj:any
  formData : FormGroup ;
  refusel_state:boolean=false
  permissions ;
  updateshipments : boolean = true ;
  createshipments : boolean = true ;
  constructor(
    private ship_ser:ShipmentsService,
     private modal:NgbModal,
     private toaster:ToastrService,
     private fb:FormBuilder,
     private  router:Router  ,
     private x : MessageService  ,
     private ships_ser: ShipmentsCompanyService,
     private _representative : RepresentativeService ,
     private _store  : StoragesService ,

    //  private barCodeScanner : BarcodeScannerOriginal ,
    //  private base64ToGallery : Base64ToGalleryOriginal ,
     ) {
     // check permissions  For USer
     if(JSON.parse(localStorage.getItem('employee')).permissions)
     {
      this.permissions  = JSON.parse(localStorage.getItem('employee')).permissions
     }
     if(this.permissions)
     {
       this.permissions.forEach(permission => {
            if(permission.name == 'update-shipments')
        {
          this.updateshipments = true
        }
        if(permission.name == 'create-shipments')
        {
          this.createshipments = true ;
        }
       });
     }
     if(!this.updateshipments || !this.createshipments )
     {
       this.router.navigate(['/home'])
     }
     if(this.value)
     {
       this.router.navigate(['/shipments' , this.value])
     }
  }

  build()
{
  this.formData = this.fb.group({
    shipment_status_id   : [null , Validators.required] ,
    representative_id     : [null] ,
    store_id  : [null],
    return_price : [null]
  })
}

// function that get all representatives
allRepresentatives :any ;
get_representatives()
{
  this._representative.get_represenative().subscribe(res =>  {
    this.allRepresentatives  = res.representative ;
  })
}

// function that get all stores
stores :any ;
get_stores()
{
  this._store.get_All().subscribe(res =>  {
    this.stores  = res.store;
  })
}

/*
  2 -> المندوب والمخزن
  3 ->  المندوب بس
  8 , 9 -> محتاج احدد قيمه المرتجع



*/

showRepresentative  : boolean = false ;
showStore  : boolean = false ;
showReturnPrice  : boolean = false ;

onChangeStatus(statusValue  : any )
{
  debugger
  console.log(statusValue);
  switch(statusValue)
  {
    case 2 :
    case 3 :
    case 4 :
    case 5 :
    case 6 :
    case 7 :
    case 10 :
    case 11 :
      this.showRepresentative = true ;
      this.showStore = true ;
      this.showReturnPrice = false ;
      break ;
    case 8 :
    case 9 :
      this.showReturnPrice = true ;
      this.showRepresentative = true ;
      this.showStore = true ;
      break ;
      default :
      this.showReturnPrice = false ;
      this.showRepresentative = false ;
      this.showStore = false ;
  }

}

// refusalStatusesId;
employee_id
shipment_id
refusal_id


refusalList
refusalStatuses(){
  return this.ship_ser.refusalStatuses().subscribe( res =>{
    this.refusalList = res
  })
}

onSwap(item:any){
  if(item.value == 6){
   this.refusel_state = true
  }else{
    this.refusel_state = false
  }
 }



  // scanCode()
  // {
  //   this.barCodeScanner.scan().then(
  //     barCodeData => {
  //       this.scannedCode = barCodeData
  //     }
  //   )
  // }

  // handleQrCodeResult(result: string) {
  //   console.log("Result", result);
  //   this.qrResult = result;

  //   // This line will redirect to the link you want
  //   window.location.href = "Insert link here";    // Maybe: document.getElementById('link')
  // }

  ngOnInit(): void {
    this.getAll(true) ;

    if(localStorage.getItem('employee'))
    {
      this.user_id = JSON.parse(localStorage.getItem('employee')).id ;
      // this.name = `${JSON.parse(localStorage.getItem('employee')).first_name } ${JSON.parse(localStorage.getItem('employee')).second_name } ${JSON.parse(localStorage.getItem('employee')).last_name } `
    }

    this.imagePath  = $('.aclass img').attr('src') ;
    this.build()
    this.refusalStatuses()
    this.getshipmentStatus();
    this.get_representatives() ;
    this.get_stores();
    document.querySelector('.animated-button1')?.addEventListener('click' , function(){
      document.getElementById('userPic')?.click() ;
      this.uploadClient()
    })


  }
  imagePath ;
  //get all
  totalOfShipments  : number  = 0 ;
  shipmentsPrices  : number  = 0 ;
  filteredShipments : any ;
  getAll(all : boolean){
    debugger


    debugger
    this.shipmentIds = [] ;
    this.shipmentsArr = [] ;
    this.shipmentsPrices = 0 ;

    if(this.isFirst == true )
    {
      this.ship_ser.get_allForCompany(true , '').subscribe(
        res=>{
          debugger
          this.List=res.shipment?.data
          this.filteredShipments=res.shipment?.data ;
          this.allData = res.shipment;
          this.totalOfShipments = res.shipment?.data?.length  ;
          console.log(res.shipment?.data);

            if(this.allData.prev_page_url == null )
            {
              this.prevDisabled = true  ;

            }else
            {
              this.prevDisabled = false ;
            }

            if(this.allData.next_page_url == null )
            {
              this.nextDisabled = true  ;
            }else
            {
              this.nextDisabled = false ;
            }

          this.List.forEach((ele =>  {
            this.shipmentsPrices += ele.product_price  ;
          }))
          this.filteredShipments.forEach((ele =>  {
            this.shipmentsPrices += ele.product_price  ;
          }))

        }
      )
    }else
    {
      this.ship_ser.get_allForCompany(false , this.pageLink).subscribe(
        res=>{
          debugger
          this.List=res.shipment?.data
          this.filteredShipments=res.shipment?.data
          this.allData = res.shipment ;
          this.totalOfShipments = res.shipment?.data?.length  ;
          console.log(res.shipment.data);

          if(this.allData.prev_page_url == null )
          {
            this.prevDisabled = true  ;

          }else
          {
            this.prevDisabled = false ;
          }
          if(this.allData.next_page_url == null )
            {
              this.nextDisabled = true  ;
            }else
            {
              this.nextDisabled = false ;
            }
          this.List.forEach((ele =>  {
            this.shipmentsPrices += ele.product_price  ;
          }))
          this.filteredShipments.forEach((ele =>  {
            this.shipmentsPrices += ele.product_price  ;
          }))

        }
      )
    }
  }


  printIt()
  {
    $(document).on('click', '#print_btn', function() {
      $('#bynat3omla').printThis({
        importCSS: true,
        importStyle: true,
      });

  })
  }


  //add_edit button
  add_edit(modal,obj){
  debugger
    this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    this.catch_obj=obj
    console.log(obj)
    this.shipment_id= obj.id
    this.employee_id = obj.employee_id
  }



  update(updateitmes:any){
    this.List=updateitmes;
    this.filteredShipments =  updateitmes
    this.modal.dismissAll()
  }


  clear(table: Table) {
    table.clear();
  }
  selectedBrowser : any ;
  shipmentIds :any[] = [] ;
  shipmentsArr :any[] = [] ;
  // filteredShipments  : any ;
  SelectRow(checkbox , shipment : any)
  {
    debugger
    console.log(checkbox.target.ariaChecked);
    if(checkbox.target?.ariaChecked == 'true' || (checkbox.originalTarget?.attributes["aria-checked"]?.value == 'true' || checkbox.originalTarget?.attributes["aria-checked"]?.value != 'false' && checkbox.originalTarget?.attributes["aria-checked"] ) )
    {
      if(this.shipmentIds.indexOf(shipment.id) == -1 )
      {
        this.shipmentIds.push(shipment.id) ;
        this.shipmentsArr.push(shipment) ;

        console.log(`push process ${this.shipmentIds}` );
        console.log(this.shipmentsArr);
        this.filteredvalue  = this.shipmentsArr ;


      }
    }else{
      if(this.shipmentIds.indexOf(shipment.id) != -1 )
      {
        this.shipmentIds.splice(this.shipmentIds.indexOf(shipment.id) , 1) ;
        this.shipmentsArr.splice(this.shipmentsArr.indexOf(shipment) , 1) ;
        console.log(`Delete process ${this.shipmentIds}` );
        this.filteredvalue  = this.shipmentsArr ;

      }
    }
  }
  filteredvalue :  any[] = [] ;
  SelectAllRow(checkbox)
  {
    this.filteredvalue  =[];

    debugger
    if(this.depTb7?.filteredValue == null )
    {
      this.filteredvalue = this.List ;
      console.log(this.filteredvalue);
      debugger
      this.shipmentIds = [] ;
      this.shipmentsArr = [] ;
      console.log(checkbox.originalTarget?.attributes["aria-checked"].value);
      if(checkbox.target?.ariaChecked == 'true' || (checkbox.originalTarget?.attributes["aria-checked"]?.value == 'true' || checkbox.originalTarget?.attributes["aria-checked"]?.value != 'false' && checkbox.originalTarget?.attributes["aria-checked"] ) )
      {
       this.List.forEach((ele =>  {
         this.shipmentIds.push(ele.id) ;
         this.shipmentsArr.push(ele) ;

       }))
      }
      else{
        this.shipmentIds = [] ;
        this.shipmentsArr = [] ;

      }
    }else
    {
      this.filteredvalue = this.depTb7?.filteredValue ;
      console.log(this.filteredvalue);
      debugger
      this.shipmentIds = [] ;
      this.shipmentsArr = [] ;
      console.log(checkbox.originalTarget?.attributes["aria-checked"].value);
      if(checkbox.target?.ariaChecked == 'true' || (checkbox.originalTarget?.attributes["aria-checked"]?.value == 'true' || checkbox.originalTarget?.attributes["aria-checked"]?.value != 'false' && checkbox.originalTarget?.attributes["aria-checked"] ) )
      {
       this.filteredvalue.forEach((ele =>  {
         this.shipmentIds.push(ele.id) ;
         this.shipmentsArr.push(ele) ;
       }))
      }
      else{
        this.shipmentIds = [] ;
        this.shipmentsArr = [] ;
      }
    }
  }


  shipmentStatus : any ;
  getshipmentStatus()
  {
    return this.ships_ser.get_shipmentStatus().subscribe((res : any ) => {
      this.shipmentStatus = res.shipment_status ;
    })
  }

  // changing The Status Of Shipments
  changeShipment_status(modal)
  {
    this.showReturnPrice = false ;
    this.showRepresentative = false ;
    this.showStore = false ;
    this.formData.reset() ;
    if(this.shipmentIds.length > 0 )
    {
      this.modal.open(modal, {size:'sm' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    }else
    {
      this.x.add({key: 'Key2', severity:'warn', summary: 'Notification', detail: 'يجب تحديد الشحنات أولا'});
    }
  }
  printBolisa(modal : any )
  {
    if(this.shipmentIds.length > 0 )
    {
      this.modal.open(modal, {size:'lg' , backdrop : 'static',keyboard : false}) //, backdrop: 'static'
    }else
    {
      this.x.add({key: 'Key2', severity:'warn', summary: 'Notification', detail: 'يجب تحديد الشحنات أولا'});
    }
  }

  changeShipment(){
debugger
    // console.log(this.formData.value.refusal_id)
    return this.ship_ser.changeShipment({shipment_id : this.shipmentIds , shipment_status_id : this.formData.controls.shipment_status_id.value , representative_id : this.formData.controls.representative_id.value , store_id : this.formData.controls.store_id.value , return_price : this.formData.controls.return_price.value}).subscribe(res =>{
      this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'تم التغيير  بنجاح'});
      this.getAll(false)
      this.modal.dismissAll()
    },err=>{
  debugger

      if(err.error?.text == "successfully" || err.status == 200)
      {
        this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'تم التغيير  بنجاح'});
        this.getAll(false)
        this.modal.dismissAll()
      }else
      {
        this.x.add({key: 'Key2', severity:'error', summary: 'Notification', detail: 'يرجى اعادة المحاوله   '});
        this.modal.dismissAll()
        console.log(err)
      }

    }

    )
  }
  fileName= 'Shipments.xlsx';
  exportexcel(): void
  {
    debugger
    if(this.shipmentsArr.length > 0 )
    {
      /* pass here the table id */
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }else
    {
      this.x.add({key: 'Key2', severity:'warn', summary: 'Notification', detail: 'يجب تحديد الشحنات أولا'});
    }
  }


  addExceclSheet(modal : any )
  {
    this.modal.open(modal  , {size : 'xm' , backdrop : 'static' , keyboard : false }) ;
  }



  data   =  [
    {company_name : 'test' , order_number : "42" , client_name :  'Yousri' , client_code :  '90'  , area  : 'zagazig' , address : 'abo_hammad' , phone : '01060493844' , phone_2  : '01060493844' , email : 'test@gmail.com' , name_product : 'test Product' , description_product : 'desc' ,weight : '1' ,size :'12'  , count : "20"  , price : '2500'  , service_types :'تسليم'  , notes :'notes'} ,
  ]

  // downloadFile()
  // {
  //  var options = {
  //    fieldSeparator: ',',
  //    quoteStrings: '"',
  //    decimalseparator: '.',
  //    showLabels: true,
  //    showTitle: false,
  //    useBom: true,
  //    noDownload: false ,
  //    headers: ["company_name", "order_number" ,  "client_name" , "client_code" , "area" , "address" , "phone" , "phone_2" , "email" , "name_product" , "description_product" , "weight" , "size" , "count" , "price" , "service_types" , "notes" ]
  //  };

  //  new  ngxCsv(this.data, "Excel Sheet Style", options);
  // }

  selectedFile: any ;
  img_path:any ;
  myFormData  = new FormData()
  uploadClient()
   {
     debugger
     document.getElementById('userPic')?.click() ;
    if(this.selectedFile != null  &&  this.selectedFile.name != null )
    {
      this.is_loading = true  ;
      this.myFormData.append("file", this.selectedFile ,  this.selectedFile.name);
      this.ship_ser.uploadFile(this.myFormData).subscribe(res =>  {
        console.log(res);

        this.selectedFile = null  ;
        this.img_path = null  ;

        $('.sucees').text('File Has been Saved Successfully ');
        setTimeout(() => {
          this.is_loading = false   ;
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});
        }, 900);
      },err=>{
        console.log(err);
        $('.sucees').text('Error  , Please Try Again ');
          this.is_loading = false ;
          if(err.error.text == "successfully")
          {
          this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'تم إضافه الشحنات بنجاح'});
          this.modal.dismissAll()
          }
        if(err.error.file)
        {
          this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: `${err.error.file[0]}`});
        }
      },()=> {
        $('.sucees').text('Uploading File  , Please Wait.....') ;
        this.is_loading = false ;
        this.selectedFile = null  ;
        this.img_path = null  ;
      })
    }else
  {
    this.is_loading = false ;
  }
   }

   imgExist  : boolean  = false  ;
   onImageChange(event:any) {
     this.is_loading = true  ;
    debugger
    if (event.files[0] && event.files) {
      this.selectedFile = <File>event.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.files[0]);
      reader.onload = (e: any) => {
        this.img_path = e.target.result;
        this.imgExist = true ;
        // if(this.selectedFile && this.img_path)
        // {
        //   this.uploadClient() ;
        // }
      }
    }
  }
  is_loading : boolean  = false ;

  fileSelected(test :any)
{
  console.log(test);

}

afuConfig = {
  multiple: false,
  formatsAllowed: ".xlsx, .xls, .csv",
  maxSize: "1000",
  uploadAPI:  {
    url:`https://waz3ly.net/dashboard/api/dashboard/import-shipment/${JSON.parse(localStorage.getItem('employee')).id}`,
    method:"POST",
    // responseType: 'blob',
    // withCredentials: false,
  },
  theme: "dragNDrop",
  hideProgressBar: false,
  hideResetBtn: false ,
  hideSelectBtn: false,
  fileNameIndex: false,
  autoUpload: false,
  replaceTexts: {
    selectFileBtn: 'Select Files',
    resetBtn: 'Reset',
    uploadBtn: 'Upload',
    dragNDropBox: 'Drag And Drop',
    attachPinBtn: 'Attach Files...',
    afterUploadMsg_success: 'Successfully Uploaded !',
    afterUploadMsg_error: 'Upload Failed !',
    sizeLimit: 'Size Limit'
  }
};

DocUpload($event)
{
  console.log($event);
}

  // more details about the shipment
  moreDetails : any;
dataIsReady : boolean =  false ;
moreDetailsFun(modal : any  , obj )
{
  debugger
  this.moreDetails = null ;
  this.moreDetails = obj ;
  this.modal.open(modal , {size : 'lg' }) ;
  if(this.moreDetails != null && this.moreDetails != undefined)
  {
    this.dataIsReady = true ;
  }else
  {
    this.dataIsReady = false  ;
  }
}



prevDisabled  : boolean = true ;
nextDisabled  : boolean = true ;
isFirst : boolean =  true ;
pageLink : any ;
allData :   any ;
nextPgae()
{
debugger
this.pageLink = this.allData.next_page_url ;
this.isFirst = false ;
this.getAll(false)
}

previousPage()
{
debugger
this.pageLink = this.allData.prev_page_url ;
if(this.allData?.current_page == 2 )
{
  this.isFirst = true ;
  this.getAll(false) ;

}else
{
  this.isFirst = false ;
  this.getAll(false) ;
}
}

firstPage()
{
debugger
this.pageLink = this.allData.first_page_url ;
this.isFirst = true ;
this.getAll(false) ;

}

lastPage()
{
debugger
this.pageLink = this.allData.last_page_url ;
this.isFirst = false  ;
this.getAll(false) ;
}


}
