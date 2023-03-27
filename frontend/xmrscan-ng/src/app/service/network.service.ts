import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { NetworkInfo, Price } from '../data/networkInfo';


const baseUrl = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
  })
  

export class NetworkService {

    constructor(
        private http: HttpClient
    ) { }

    getNetworkInfo(): Observable<NetworkInfo> {
        return this.http.get<NetworkInfo>(baseUrl + '/networkInfo');
    }

    getPrice(): Observable<Price> {
        return this.http.get<Price>(baseUrl + '/price');
    }

}