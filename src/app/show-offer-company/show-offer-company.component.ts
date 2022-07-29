import { MessageService } from 'primeng/api';
import { OfferService } from './../services/offer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  providers  : [MessageService]  ,
  selector: 'app-show-offer-company',
  templateUrl: './show-offer-company.component.html',
  styleUrls: ['./show-offer-company.component.css']
})
export class ShowOfferCompanyComponent implements OnInit {


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
    this.offer.get_offer_companies().subscribe((res : any ) =>  {
      this.allOffers  = res.offer ;
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
    this.offer.subscribeOffer({offer : [offer.id]}).subscribe(res => {
      this.x.add({key: 'Key2', severity:'success', summary: 'Notification', detail: 'تم الإشتراك بنجاح '});
      console.log(res);
      this.get_offers()
    },err=>  {
      console.log(err);

    })
  }
}
