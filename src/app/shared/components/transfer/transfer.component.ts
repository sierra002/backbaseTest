import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MoneyTranslatorService} from '../../services/money-translator/money-translator.service';

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

  constructor(private moneyTranslatorService: MoneyTranslatorService) {
  }

  ngOnInit(): void {
    this.transaction = new FormGroup({
      account: new FormControl({
        value: this.moneyTranslatorService.fromStoredToMoney(this.money, this.account),
        disabled: true
      }, Validators.min(-500)),
      toAccount: new FormControl(),
      amount: new FormControl(null, this.valueExceededValidator.bind(this))
    });
  }


  sendTransaction(): void {
    const top = this.moneyTranslatorService.fromMoneyToStored(-500);
    if ((this.money - this.moneyTranslatorService.fromMoneyToStored(this.transaction.get('amount').value)) > top) {
      this.money -= this.moneyTranslatorService.fromMoneyToStored(this.transaction.get('amount').value);
      this.transaction.get('account').setValue(this.moneyTranslatorService.fromStoredToMoney(this.money, this.account));
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
}
