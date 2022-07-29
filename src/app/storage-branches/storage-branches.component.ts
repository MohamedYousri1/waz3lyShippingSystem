import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BranchesService } from '../services/branches.service';
import { StoragesService } from '../services/storages.service';
import { CatchItemService } from '../shared/catch-item.service';

@Component({
  selector: 'app-storage-branches',
  templateUrl: './storage-branches.component.html',
  styleUrls: ['./storage-branches.component.css']
})
export class StorageBranchesComponent implements OnInit {
  catch_id:any
  stroages:any[]=[]

  branches:any[]=[]
  //catch name from ser
  catch_name:any



  //pagination
  rows = 5;
  recourdNumber:number;
  constructor(private storage_ser:StoragesService,
              private rout:ActivatedRoute,
              private catch_ser:CatchItemService,
              private branch_ser:BranchesService) { }

  ngOnInit(): void {
    this.rout.params.subscribe(
      res=>{
        this.catch_id=res.id
      }
    )
    this.getstorage(this.catch_id)
    this.get_one_branch(this.catch_id)
   // this.get_from_ser()
  }

  //get it from routing
  getstorage(id){
    this.storage_ser.get_storage(id).subscribe(
      res=>{
        this.stroages=res
      }
    )
  }

  get_one_branch(id){
    this.branch_ser.get_one_branch(id).subscribe(
      res=>{
        this.catch_name=res.name
      }
    )
  }

}
