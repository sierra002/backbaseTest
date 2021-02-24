import {Component, OnInit} from '@angular/core';
import * as transactions from '../../../../mock/transactions.json';
import {TRANSACTION_INDICATOR} from '../../models/transaction-indicator';
import {MONTS} from '../../models/months';
import {images} from '../../models/images';
import {TransactionService} from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions = [];
  dataToShow = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transactions = transactions.data;
    this.parseToView();
    this.transactionService.transaction.subscribe((transaction) => {
      this.transactions.push(transaction);
      this.parseToView();
    });
  }

  sortData(a, b): number {
    const dateA = new Date(a.dates.valueDate).getTime();
    const dateB = new Date(b.dates.valueDate).getTime();
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1;
    }
    return 0;
  }

  parseToView(): void {
    this.dataToShow = this.transactions.sort(this.sortData).map((t) => {
      const date = new Date(t.dates.valueDate);
      return {
        date: `${MONTS[date.getMonth()]} ${date.getDate()}`,
        amount: TRANSACTION_INDICATOR[t.transaction.creditDebitIndicator] + '$' + t.transaction.amountCurrency.amount,
        // tslint:disable-next-line:max-line-length
        img: images[t.merchant.name] ? images[t.merchant.name] : images.default, // probably this should be provided by backend but for this case i have used the images i have,
        name: t.merchant.name,
        type: t.transaction.type,
        color: t.categoryCode
      };
    });
    console.log(this.transactions);
    console.log(this.dataToShow);
  }

}
