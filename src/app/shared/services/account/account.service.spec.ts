import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(() => {
    service = new AccountService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
