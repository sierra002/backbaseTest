import {Component, OnInit} from '@angular/core';
import * as transactions from '../../../../mock/transactions.json';
import {TRANSACTION_INDICATOR} from '../../models/transaction-indicator';
import {MONTS} from '../../models/months';
import {images} from '../../models/images';
import {TransactionService} from '../../services/transaction/transaction.service';
import {FormControl} from '@angular/forms';

export type SortType = 'date' | 'name' | 'amount';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions = [];
  dataToShow = [];
  search = new FormControl();
  sortType: SortType = 'date';
  desc = true;

  get isDate(): boolean {
    return this.sortType === 'date';
  }

  get isName(): boolean {
    return this.sortType === 'name';
  }

  get isAmount(): boolean {
    return this.sortType === 'amount';
  }

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

  sortBy(type: SortType): void {
    if (type !== this.sortType) {
      this.sortType = type;
    } else {
      this.desc = !this.desc;
    }
    this.parseToView();
  }

  sortData(a, b): number {
    let prop = null;
    let propA = null;
    let propB = null;
    const descVal = this.desc ? 1 : -1;
    switch (this.sortType) {
      case 'amount':
        prop = 'amount';
        propA = a[prop];
        propB = b[prop];
        break;
      case 'name':
        prop = 'name';
        propA = a[prop];
        propB = b[prop];
        break;
      default:
        prop = 'dateMills';
        propA = new Date(a[prop]).getTime();
        propB = new Date(b[prop]).getTime();
        break;
    }
    if (propA > propB) {
      return descVal * -1;
    } else if (propA < propB) {
      return descVal * 1;
    }
    return 0;

  }

  parseToView(): void {
    this.dataToShow = this.transactions.map((t) => {
      const date = new Date(t.dates.valueDate);
      return {
        dateMills: t.dates.valueDate,
        date: `${MONTS[date.getMonth()]} ${date.getDate()}`,
        amount: parseInt(TRANSACTION_INDICATOR[t.transaction.creditDebitIndicator] + 1 , 10) * t.transaction.amountCurrency.amount,
        amountText: TRANSACTION_INDICATOR[t.transaction.creditDebitIndicator] + '$' + t.transaction.amountCurrency.amount,
        // tslint:disable-next-line:max-line-length
        img: images[t.merchant.name] ? images[t.merchant.name] : images.default, // probably this should be provided by backend but for this case i have used the images i have,
        name: t.merchant.name,
        type: t.transaction.type,
        color: t.categoryCode
      };
    }).sort(this.sortData.bind(this));
    console.log(this.transactions);
    console.log(this.dataToShow);
  }

}
