import { TestBed } from '@angular/core/testing';

import { MoneyTranslatorService } from './money-translator.service';

describe('MoneyTranslatorService', () => {
  let service: MoneyTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
