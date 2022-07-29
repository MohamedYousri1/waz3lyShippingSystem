import { SupervisorsService } from './../services/supervisors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.css']
})
export class SupervisorsComponent implements OnInit {
  catch_id: any
  all_supervisors: any[] = []

  branches: any[] = []
  //catch name from ser
  catch_name: any



  //pagination
  rows = 5;
  recourdNumber: number;
  constructor(private supervisors: SupervisorsService) { }

  ngOnInit(): void {
  }



}
