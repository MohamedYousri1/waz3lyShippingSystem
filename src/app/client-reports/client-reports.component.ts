import { UsersService } from './../services/users.service';
import { ClientsService } from './../services/clients.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat, Location } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-client-reports',
  templateUrl: './client-reports.component.html',
  styleUrls: ['./client-reports.component.css']
})
export class ClientReportsComponent implements OnInit {

  //pagination
  rows = 5;
  recourdNumber: number;
  areas: any
  areaName: any;
  constructor(private fb: FormBuilder, private _client: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getAllClients()
    this.getAllBacks()
    // this.location.isCurrentPathEqualTo('client-reports')
  }

  name: String;
  num: any[] = []
  // get all Clients
  allClients;
  Prepaidlength: number;
  PostpaidLenght: number;
  Postpaid: any[] = [];
  Prepaid: any[] = []
  getAllClients() {
    return this._client.getAll().subscribe(res => {
      this.allClients = res.map(item => {
        this.name = item?.first_name + ' ' + item?.last_name;
        item.name = this.name;
    

        if (item.is_deal_type_now === 0) {
          this.Prepaid.push(item)
        } else {
          this.Postpaid.push(item)
        }
        return item

      })
      this.Prepaidlength = this.Prepaid.length
      this.PostpaidLenght = this.Postpaid.length


    })
  }

  allBacks: any[] = [];

  selectedMembers: any;
  memList: any[] =[]
  getAllBacks() {
    return this._client.getBacks().subscribe(res => {
      this.allBacks = res
      this.selectedMembers = this.allBacks
     
    })
  }



  // x:any[]=[]

  getDate(start: Date, end: Date) {
  start = new Date(start)
  end = new Date(end);
    this.selectedMembers = this.allBacks.filter(m => {
      m.date_of_receipt = new Date(m.date_of_receipt);
      if (m.date_of_receipt > start && m.date_of_receipt < end) {
        return m ;
      } 
       
    }
    );

  }



}
