import { TransferMoneyService } from './../services/transfer-money.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  providers: [MessageService, ConfirmationService],
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css'],
})
export default class MoneyTransferComponent implements OnInit {
  empoloyee_id: any;
  constructor(
    private _transfer: TransferMoneyService,
    private x: MessageService
  ) {
    if (localStorage.getItem('employee')) {
      this.empoloyee_id = JSON.parse(
        localStorage.getItem('employee') || '{}'
      ).id;
    }
  }

  ngOnInit(): void {
    this.get_treasuries();
  }

  // Get All Activated Treasuries
  allTreasuries: any;
  filteredTreasuries: any;
  from_treasury: any = null;
  netAmountFrom: number = 0;
  to_treasury: any;
  netAmountTo: number = 0;
  transfer_amount: number = 0;

  get_treasuries() {
    debugger
    this._transfer.get_allTreasuries().subscribe((res: any) => {
      this.allTreasuries = res.treasuries;
      console.log(this.allTreasuries);

    });
  }
  onTreasuryFromChange(treasury: any) {
    debugger;
    console.log(treasury);
    if (treasury) {
      this.netAmountFrom = treasury.income - treasury.expense;
      this.from_treasury = treasury.id;
      this.filteredTreasuries = this.allTreasuries.filter((ele: any) => {
        return ele.id !== treasury.id;
      });
    } else {
      this.from_treasury = null;
      this.to_treasury = null;
      this.filteredTreasuries = null;
    }
  }

  to_treasuryChange(treasury: any) {
    if (treasury) {
      this.netAmountTo = treasury.income - treasury.expense;
      this.to_treasury = treasury.id;
    } else {
      this.to_treasury = null;
    }
  }

  fireTransfer() {
    debugger;
    if (this.from_treasury == null) {
      this.x.add({
        key: 'myKey2',
        severity: 'error',
        summary: 'Notification',
        detail: 'Select Treasury That You Want To Transfer From ',
      });
    } else if (this.to_treasury == null) {
      this.x.add({
        key: 'myKey2',
        severity: 'error',
        summary: 'Notification',
        detail: 'Select Treasury That You Want To Transfered To ',
      });
    } else if (this.transfer_amount <= 0) {
      this.x.add({
        key: 'myKey2',
        severity: 'error',
        summary: 'Notification',
        detail: 'Amount Should Be Greater Than 0 ',
      });
    } else {
      this._transfer
        .transferMoney({
          treasurie_start_id: this.from_treasury,
          treasurie_end_id: this.to_treasury,
          price: this.transfer_amount,
          employee_id: this.empoloyee_id,
        })
        .subscribe(
          (res) => {
            this.x.add({
              key: 'myKey2',
              severity: 'success',
              summary: 'Notification',
              detail: 'Data Has Saved Successfully',
            });
            this.cancelTransfer();
            this.get_treasuries();
          },
          (err) => {
            if (err.error == 'user dose not have this permission') {
              this.x.add({
                key: 'myKey2',
                severity: 'error',
                summary: 'Notification',
                detail: 'user dose not have this permission',
              });
            }
          }
        );
    }
  }

  // functino To Cancel Transfering Money
  cancelTransfer() {
    this.from_treasury = null;
    this.to_treasury = null;
    this.transfer_amount = 0;
  }

  // testing array Treasury
  treasuries = [
    {
      name: 'treasury 1',
      transactionOut: 100,
      transactionIn: 200,
      netbalance: 100,
    },
    {
      name: 'treasury 1',
      transactionOut: 100,
      transactionIn: 200,
      netbalance: 100,
    },
    {
      name: 'treasury 1',
      transactionOut: 100,
      transactionIn: 200,
      netbalance: 100,
    },
    {
      name: 'treasury 1',
      transactionOut: 100,
      transactionIn: 200,
      netbalance: 100,
    },
  ];
}
