import {TransactionListComponent} from './transaction-list.component';
import {TransactionService} from '../../services/transaction/transaction.service';
import {of} from 'rxjs';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let transactionService: TransactionService | any;

  beforeEach(() => {
    transactionService = {
      transaction: of()
    };
    component = new TransactionListComponent(transactionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sortBy', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should sort by date', () => {
      component.desc = false;
      component.sortBy('date');
      expect(component.dataToShow[0].name).toEqual('Backbase');
    });
    it('should sort by Name', () => {
      component.sortBy('name');
      expect(component.dataToShow[0].name).toEqual('Whole Foods');
    });
    it('should sort by amount', () => {
      component.sortBy('amount');
      expect(component.dataToShow[0].amount).toEqual(6000);
    });
    it('should keep order if sortBy changes', () => {
      component.sortType = 'amount';
      component.desc = true;
      component.sortBy('date');
      expect(component.desc).toEqual(true);
    });
    it('should call parseToView', () => {
      spyOn(component, 'parseToView').and.callThrough();
      component.sortBy('date');
      expect(component.parseToView).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component, 'parseToView').and.callThrough();
      component.ngOnInit();
    });
    it('should set transactions', () => {
      expect(component.transactions.length).toEqual(11);
    });

    it('should call parseToView', () => {
      expect(component.parseToView).toHaveBeenCalled();
    });
  });
});
