import { Injectable } from '@angular/core';
import {TransactionModel} from '../../models/transaction';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // transaction: TransactionModel[];

  _username: string;
  _balance: number;
  _transactions: any[];
  _tags: any;

  constructor(public storage: Storage) {
    console.log('Init StorageService');
    this.storage.ready().then(ok => {
      Promise.all([
        this.storage.get('username'),
        this.storage.get('balance'),
        this.storage.get('transactions'),
        this.storage.get('tags')
      ]).then(results => {
        console.log(results);
        this._username = results[0];
        this._balance = results[1];
        this._transactions = results[2];
        this._tags = results[3];
      });
    }).catch(err => console.log(err));
  }

  get username(): string {
    console.log('ff');
    return this._username;
  }

  set username(value: string) {
    console.log('set username');
    this.storage.set('username', value);
    this._username = value || 'Vasya';
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this.storage.set('balance', value);
    this._balance = value || 0;
  }

  get transactions(): any[] {
    return this._transactions;
  }

  set transactions(value: any[]) {
    this.storage.set('transactions', value);
    this._transactions = value;
  }

  get tags(): any {
    return this._tags;
  }

  set tags(value: any) {
    console.log('storage save tags');
    this.storage.set('tags', value);
    this._tags = value || {};
  }
}
