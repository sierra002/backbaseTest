import {TransferComponent} from './transfer.component';
import {MoneyTranslatorService} from '../../services/money-translator/money-translator.service';
import {TransactionService} from '../../services/transaction/transaction.service';

describe('TransferComponent', () => {
  let component: TransferComponent;
  let moneyService: MoneyTranslatorService | any;
  let transactionService: TransactionService | any;

  beforeEach(() => {
    moneyService = {};
    transactionService = {};
    component = new TransferComponent(moneyService, transactionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
