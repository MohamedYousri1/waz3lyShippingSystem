import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  constructor(private router: Router
    , private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.reloadCurrentPage() ;
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
  }




}
