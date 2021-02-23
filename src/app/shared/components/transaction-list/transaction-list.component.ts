import {Component, OnInit} from '@angular/core';
import * as transactions from '../../../../mock/transactions.json';

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

enum TRANSACTION_INDICATOR {
  'CRDT' = '',
  'DBIT' = '-',
  undefined = ''
}

export const MONTS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

enum images {
  'Backbase'= '../../../../assets/icons/backbase.png',
  'The Tea Lounge' = '../../../../assets/icons/the-tea-lounge.png',
  'Texaco'= '../../../../assets/icons/texaco.png',
  'Amazon Online Store'= '../../../../assets/icons/amazon-online-store.png',
  '7-Eleven' = '../../../../assets/icons/7-eleven.png',
  'Jerry Hildreth' =  '../../../../assets/icons/jerry-hildreth.png',
  'Lawrence Pearson' =  '../../../../assets/icons/lawrence-pearson.png',
  'H&M Online Store' = '../../../../assets/icons/h&m-online-store.png',
  'Southern Electric Company' = '../../../../assets/icons/southern-electric-company.png',
  'Whole Foods'= '../../../../assets/icons/whole-foods.png',

}
