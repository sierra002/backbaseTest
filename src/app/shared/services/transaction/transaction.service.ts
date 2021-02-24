import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Transaction} from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transaction$ = new Subject<Transaction>();

  get transaction(): Observable<Transaction> {
    return this.transaction$.asObservable();
  }

  constructor() {
  }

  public sendTransaction(transaction: Transaction): void {
    this.transaction$.next(transaction);
  }
}
