import {TransactionService} from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
