import {Component, OnInit} from '@angular/core';
import * as transactions from '../../../../mock/transactions.json';
import {TRANSACTION_INDICATOR} from '../../models/transaction-indicator';
import {MONTS} from '../../models/months';
import {images} from '../../models/images';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions = [];
  dataToShow = [];

  constructor() {
  }

  ngOnInit(): void {
    this.transactions = transactions.data.sort(this.sortData);
    console.log(this.transactions);
    this.parseToView();
  }

  sortData(a, b): number {
    if (a.dates.valueDate > b.dates.valueDate) {
      return -1;
    } else if (a.dates.valueDate < b.dates.valueDate) {
      return 1;
    }
    return 0;
  }

  parseToView(): void {
    this.dataToShow = this.transactions.map((t) => {
      const date = new Date(t.dates.valueDate);
      return {
        date: `${MONTS[date.getMonth()]} ${date.getDate()}`,
        amount: TRANSACTION_INDICATOR[t.transaction.creditDebitIndicator] + '$' + t.transaction.amountCurrency.amount,
        img: images[t.merchant.name],
        name: t.merchant.name,
        type: t.transaction.type,
        color: t.categoryCode
      };
    });
    console.log(this.dataToShow);
  }

}
