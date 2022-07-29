import { TreasuryInService } from './../services/treasury-in.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-in',
  templateUrl: './transaction-in.component.html',
  styleUrls: ['./transaction-in.component.css']
})
export class TransactionInComponent implements OnInit {

  constructor(
    private  treasuryIn   : TreasuryInService ,
  ) { }

  ngOnInit(): void {
    this.gettingTreasuries()
  }
  allTreasuries  : any ;
  allTreasuriesIn :any[] = []
  filterValue : any ;
  gettingTreasuriesIn(treasury_id : any )
  {
    debugger
    this.treasuryIn.getAllData(treasury_id).subscribe((res  : any ) =>  {
      this.allTreasuriesIn = res.income ;
      console.log(res);

    })
  }

  gettingTreasuries()
  {
    this.treasuryIn.get_allTreasuries().subscribe(res =>  {
      this.allTreasuries = res ;
    })
  }

  onFlterChange(filterValue : any )
  {
    console.log(filterValue);
    this.filterValue  = filterValue  ;
  }
filteredClients   : any[] = [] ;
  searchAndFilter()
  {
    if(this.filterValue)
    {
      this.gettingTreasuriesIn(this.filterValue) ;
    }else
    {
      this.allTreasuriesIn = []
    }
  }


}
