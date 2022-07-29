import { MessageService } from 'primeng/api';
import { OfferService } from './../services/offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  providers : [MessageService] ,
  selector: 'app-offer-staorage-company',
  templateUrl: './offer-staorage-company.component.html',
  styleUrls: ['./offer-staorage-company.component.css']
})
export class OfferStaorageCompanyComponent implements OnInit {


  company_id : any ;

  constructor(
    private offer : OfferService ,
    private x : MessageService

  ) {

    this.company_id = JSON.parse(localStorage.getItem('employee') || '{}').user_data?.id ;
   }

  ngOnInit(): void {
    this.get_offers() ;
  }

  // get offers for companies
  allOffers  ;
  get_offers()
  {
    debugger
    this.offersList = [];
    this.offer.get_offer_storage_companies().subscribe((res : any ) =>  {
      this.allOffers  = res.storage_system ;
      console.log(res);

      // this.allOffers.forEach((offer : any ) => {
      //   if(offer.company?.length > 0 )
      //   {
      //     offer.company.indexOf(this.company_id)
      //   }
      //   this.offersList.push(this.company_id) ;
      // });
    },err=> {
      console.log(err);

    })
  }


  offersList  : any[] = [] ;
  subscribeOffers(offer){
    debugger
    this.offer.subscribeOfferStorage({storage_system : [offer.id]}).subscribe(res => {
      this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'تم الإشتراك بنجاح '});
      console.log(res);
      this.get_offers()
    },err=>  {
      console.log(err);

    })
  }
}
