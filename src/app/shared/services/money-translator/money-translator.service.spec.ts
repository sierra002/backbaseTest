import {MoneyTranslatorService} from './money-translator.service';

describe('MoneyTranslatorService', () => {
  let service: MoneyTranslatorService;

  beforeEach(() => {
    service = new MoneyTranslatorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
