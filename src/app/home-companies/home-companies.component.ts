import { SliderService } from './../services/slider.service';
import { Component, OnInit, ViewChild } from '@angular/core';
declare var $:any ;

@Component({
  selector: 'app-home-companies',
  templateUrl: './home-companies.component.html',
  styleUrls: ['./home-companies.component.css']
})
export class HomeCompaniesComponent implements OnInit {
  responsiveOptions;
  showAds : boolean =  true  ;
  constructor(private slider_serv:SliderService) {
    this.getAll()
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];

  debugger
  if(localStorage.getItem('needAds') == 'true' )
  {
    this.showAds = true
  } else if(localStorage.getItem('needAds') == 'false')
  {
    this.showAds = false
  }else
  {
    this.showAds = true

  }
  }

  ngOnInit(): void {

  }


  sliderLists :any ;
  getAll(){
    this.slider_serv.getAll().subscribe(res =>{
      this.sliderLists=res.advertisement ;
      console.log(this.sliderLists);

    })
  }

  needAds  : boolean = true ;
  hideAds()
  {
    $('.ads').fadeOut(500) ;
    localStorage.setItem('needAds' , `false`) ;

  }
}
