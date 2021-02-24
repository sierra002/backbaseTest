import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MoneyTranslatorService} from '../../services/money-translator/money-translator.service';
import {TransactionService} from '../../services/transaction/transaction.service';
import {distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  private account = 'Free checking(4692) -';
  transaction: FormGroup;
  money = 582476;
  disableSubmit = false;

  constructor(private moneyTranslatorService: MoneyTranslatorService, private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.transaction = new FormGroup({
      account: new FormControl({
        value: this.moneyTranslatorService.fromStoredToMoney(this.money, this.account),
        disabled: true
      }, Validators.min(-500)),
      toAccount: new FormControl(null, Validators.required),
      amount: new FormControl(null, [this.valueExceededValidator.bind(this), Validators.min(0), Validators.required])
    });

    // no need to unsubscribe because it's a single page
    this.transaction.get('amount').valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
      this.disableSubmit = false;
      this.transaction.get('amount').updateValueAndValidity();
    });
  }


  sendTransaction(): void {
    if (this.transaction.invalid) {
      return;
    }
    const top = this.moneyTranslatorService.fromMoneyToStored(-500);
    if ((this.money - this.moneyTranslatorService.fromMoneyToStored(this.transaction.get('amount').value)) > top) {
      this.money -= this.moneyTranslatorService.fromMoneyToStored(this.transaction.get('amount').value);
      this.transaction.get('account').setValue(this.moneyTranslatorService.fromStoredToMoney(this.money, this.account));
      this.transactionService.sendTransaction({
        categoryCode: this.getRandomColor(),
        dates: {
          valueDate: new Date().getTime()
        },
        merchant: {
          accountNumber: '0', // usually i think back should provide this or user but in order to simplify i just dont care about it
          name: this.transaction.get('toAccount').value
        },
        transaction: {
          amountCurrency: {
            amount: this.transaction.get('amount').value,
            currencyCode: 'EUR' // there's no way to configure this in this app
          },
          creditDebitIndicator: 'DBIT',
          type: 'Transaction'
        }
      });
      this.transaction.patchValue({
        toAccount: null,
        amount: null
      });
    } else {
      this.disableSubmit = true;
      this.transaction.get('amount').updateValueAndValidity();
    }
  }

  /**
   * Validator created to show error before changing the actual
   * money value
   */
  valueExceededValidator(): ValidationErrors | null {
    return this.disableSubmit ? {maxExceeded: true} : null;
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
