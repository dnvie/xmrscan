import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Transaction } from '../data/transaction';


const baseUrl = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
  })
  

export class TransactionService {

    constructor(
        private http: HttpClient
    ) { }

    getTx(hash: string | null): Observable<Transaction> {
        return this.http.get<Transaction>(baseUrl + '/transaction/' + hash);
    }

}