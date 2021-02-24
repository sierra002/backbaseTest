import {TransferComponent} from './transfer.component';
import {MoneyTranslatorService} from '../../services/money-translator/money-translator.service';
import {TransactionService} from '../../services/transaction/transaction.service';
import anything = jasmine.anything;

describe('TransferComponent', () => {
  let component: TransferComponent;
  let moneyService: MoneyTranslatorService | any;
  let transactionService: TransactionService | any;

  beforeEach(() => {
    moneyService = {
      fromStoredToMoney: (a, b) => a + b,
      fromMoneyToStored: (a) => a
    };
    transactionService = {
      sendTransaction: () => {
      }
    };
    component = new TransferComponent(moneyService, transactionService);
    component.formDirective = {
      resetForm: () => {
      }
    } as any;
  });
  beforeEach(() => {
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form group', () => {
      expect(component.transaction).toBeTruthy();
      const test: any = {toAccount: null, amount: null};
      expect(component.transaction.value).toEqual(test);
    });
    it('should amount change should set disableSubmit as false', () => {
      component.disableSubmit = true;
      component.transaction.get('amount').setValue(12);
      expect(component.disableSubmit).toBeFalsy();
    });
  });

  describe('sendTransaction', () => {
    it('should call sendTransaction', () => {
      component.transaction.patchValue({toAccount: 'test', amount: 1234});
      spyOn(transactionService, 'sendTransaction').and.callThrough();
      spyOn(component, 'getRandomColor').and.returnValue('#DFDF59');
      component.sendTransaction();
      expect(transactionService.sendTransaction).toHaveBeenCalledWith({
        categoryCode: '#DFDF59',
        dates: {valueDate: anything()},
        merchant: {accountNumber: '0', name: 'test'},
        transaction: {
          amountCurrency: {amount: 1234, currencyCode: 'EUR'},
          creditDebitIndicator: 'DBIT', type: 'Transaction'
        }
      });
    });
  });
});
