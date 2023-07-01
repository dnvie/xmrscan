import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Mempool } from '../data/mempool';


const baseUrl = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
  })
  

export class MempoolService {

    constructor(
        private http: HttpClient
    ) { }

    getMempool(): Observable<Mempool> {
        return this.http.get<Mempool>(baseUrl + '/mempool');
    }
}