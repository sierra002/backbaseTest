import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoneyTranslatorService {

  constructor() {
  }

  fromStoredToMoney(value: number, additionalText = ''): string {
    return `${additionalText} ${value > 0 ? '$' + value / 100 : '( $' + (value / 100) + ')'}`;
  }

  fromMoneyToStored(value): number {
    return value * 100;
  }
}
