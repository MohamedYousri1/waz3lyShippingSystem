import { TreasuryService } from './../services/treasury.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode, ConfirmationService } from 'primeng/api';
import {MessageService} from 'primeng/api';



@Component({
  providers : [MessageService ,ConfirmationService] ,
  selector: 'app-treasury',
  templateUrl: './treasury.component.html',
  styleUrls: ['./treasury.component.css']
})
export class TreasuryComponent implements OnInit {

  files1: TreeNode[]  =[];
  items: MenuItem[] = [];
  selectedNode: any ;
  constructor(
    private  _treasury  : TreasuryService ,
    private x : MessageService ,
    private modal:NgbModal ,
    private fb : FormBuilder ,
    private confirmationService : ConfirmationService
    ) { }

  ngOnInit(): void {
    // invoke Function Of Incomes
    this.getTreasuries() ;
    this.get_mainTreasury() ;
    this.addingTreasuryFormBuild() ;
    this.items = [
      {label: 'Edit', icon: 'pi pi-pencil', command: (event) => document.getElementById('editingBtn')?.click()},
      {label: 'Delete', icon: 'pi pi-times', command: (event) => this.confirmDelete()} ,
  ];
  }



  // get all Incomes
  getTreasuries()
  {
    debugger
    this._treasury.get_allTreasury().subscribe((res : any  ) =>  {
      this.files1 = <TreeNode[]> res.treasuries;
      console.log(this.files1);

    })
    this.nodeId = null ;
  }


  viewFile(file: TreeNode) {
    this.x.add({severity: 'info', summary: 'Node Details', detail: file.label});
}

nodeSelect(node  :any )
{
  console.log(node);
  this.selectedNode = node.node ;
  this.treasuryName = node.node.label  ;
  this.nodeId = node.node.id ;
  this.x.add({severity: 'info', summary: 'Node Details', detail: `${node.node.label} Is Selected Successfully`});
}
unselectFile() {
    this.selectedNode = null;
}

// editing Node
cantRemove :boolean =  false  ;
nodeId : any ;
treasuryName  : any ;
editNode(modal:any , node : any  )
{
  console.log(node);


  // if(node.node.children.length > 0)
  // {
  //   this.cantRemove  = true ;
  // }
  if(node == null || node == undefined)
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'Please Select Treasury First'});

  }else
  {
    this.nodeId = node.id ;
  this.modal.open(modal  , {size : 'md' , backdrop : 'static' , keyboard:false }) ;
  }
}
editTreasury()
{
  if(this.nodeId == null )
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'error'});

  }else if (this.treasuryName == null )
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'Title Is Required '});

  }else
  {
    this._treasury.edit_Treasurie({label : this.treasuryName} , this.nodeId).subscribe(res => {
      this.getTreasuries() ;
      this.modal.dismissAll() ;
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});

    },err=>  {
      if(err.error.label)
      {
      this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'This Title Has Already Exist'});
      }
    })
  }

}
cancelEditingForm()
{
  this.modal.dismissAll() ;
}
////////////////////////
// Working On Adding Treasury
branchTreasury : any ;
allMainTreasury : any ;
addingTreasuryForm : any  ;

addingTreasuryFormBuild()
{
  this.addingTreasuryForm = this.fb.group({
    treasury_id : [null]  ,
    label  : [null , Validators.required ]
  })
}
// get Main Incomes
addTreasuryPop(modal : any )
{
  this.addingTreasuryForm.reset()
    this.modal.open(modal  , {size : 'xs' , backdrop : 'static' , keyboard : false }) ;
}

get_mainTreasury()
{
  this._treasury.get_mainTreasury().subscribe((res : any ) =>  {
    this.allMainTreasury  = res.treasuries   ;
  },err=> {
    this.allMainTreasury = [] ;
  })
}

addTreasury()
{
  debugger
  if(this.addingTreasuryForm.controls.label.value  == null )
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'Treasury Titlte Is Required '});

  }else if (this.addingTreasuryForm.controls.treasury_id.value  == null &&  this.addingTreasuryForm.controls.label.value  != null )
  {
    this.addingTreasuryForm.removeControl('treasury_id') ;
    this.addingTreasuryForm.addControl('treasury_id' , this.fb.control(null)) ;
    this._treasury.adding_Treasurie(this.addingTreasuryForm.value).subscribe(res =>  {
    this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});
      this.getTreasuries() ;
      this.modal.dismissAll() ;
      this.get_mainTreasury()
    },err=>  {
     if(err.error.label)
      {
      this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'This Title Has Already Exist'});
      }
    })
  }else if (this.addingTreasuryForm.controls.treasury_id.value  != null &&  this.addingTreasuryForm.controls.label.value  != null)
  {
    this._treasury.adding_Treasurie(this.addingTreasuryForm.value).subscribe(res =>  {
      this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully'});
        this.getTreasuries() ;
        this.modal.dismissAll() ;
      },err=>  {
        if(err.error.label)
        {
        this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'This Title Has Already Exist'});
        }

      })
  }
}

cancelForm()
{
  this.addingTreasuryForm.reset() ;
}

// deleting A Treasury
deleteTreasury()
{
  this._treasury.delete_teasury(this.nodeId).subscribe
}

confirmDelete() {
  debugger
  if(this.nodeId == null ||  this.nodeId == undefined )
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'Please Select Treasury First'});
  }else if (this.selectedNode.children  && this.selectedNode.children.length  > 0  )
  {
    this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'This Treasury Can\'t Deleted '});

  }
  else
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        debugger
        this._treasury.delete_teasury(this.nodeId).subscribe(res => {
        this.getTreasuries() ;
        this.get_mainTreasury() ;
        this.x.add({key: 'myKey2', severity:'success', summary: 'Notification', detail: 'Data Saved Successfully '});
        },err=> {
          if(err.error.message)
          {
            this.x.add({key: 'myKey2', severity:'error', summary: 'Notification', detail: 'This Treasury Can\'t Deleted '});
          }
        })
      }
  });
  }

}
}
