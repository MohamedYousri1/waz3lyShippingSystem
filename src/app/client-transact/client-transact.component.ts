import { ShipmentsCompanyService } from './../services/shipments-company.service';
import { Component, OnInit , Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';
declare  var $:any ;
@Component({
  selector: 'app-client-transact',
  templateUrl: './client-transact.component.html',
  styleUrls: ['./client-transact.component.css']
})
export class ClientTransactComponent implements OnInit {
  catchobj:any;
  constructor(
  private modal:NgbModal ,
  private ships_ser: ShipmentsCompanyService,

  ) { }

  // define all Variables
  allCompanies : any ;
  allShipments: any ;
  startDate  : Date  = new Date() ;
  endDate  : Date  = new Date() ;



  ngOnInit(): void {
    // invoke funcdtions  that needed to be start after init
    this.get_all_companies() ;
    this.get_all_shipments() ;
  }




    // get all Companies Using Api
    get_all_companies()
    {
      return this.ships_ser.get_companiesShipment().subscribe(res => {
        this.allCompanies  = res ;
      })
    }

    // ====. get All Shipments

    get_all_shipments()
    {
      this.ships_ser.getAll(false ,  '' , {}).subscribe(res => {
        this.allShipments   = res ;
        this.containerShipments = this.allShipments ;
        console.log(this.allShipments);

      })
    }


    // when change the selector of the company
    containerShipments  : any  ;
    onCompanyChange(userId : any )
    {
      this.allShipments = this.containerShipments
      console.log(userId);

      if(typeof(userId) == 'number' )
      {
        this.allShipments = this.allShipments.filter((shipment : any ) =>
          {
            if(shipment.user_id)
            {
              return shipment.user_id == userId
            }

          }) ;
          console.log(this.allShipments);

      }else
      {
        this.allShipments = this.containerShipments
      }

    }

    // Function of Filtering Data Depend on Start and End Date
    filterByDate()
    {
      debugger
      this.allShipments = this.containerShipments
      this.allShipments  = this.allShipments.filter((item : any )=> {
        if(item.created_at)
        {
          return (new Date(item.created_at).getTime() >= new Date(this.startDate).getTime()) &&
              ( new Date(item.created_at).getTime() <= new Date(this.endDate).getTime())
        }
      });

    }

  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.allShipments);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Shipments");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
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

}

