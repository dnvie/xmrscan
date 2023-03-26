import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { NetworkInfo } from '../data/networkInfo';


const url = 'http://localhost:3000/networkInfo';

@Injectable({
    providedIn: 'root'
  })
  

export class NetworkService {

    constructor(
        private http: HttpClient
    ) { }

    getNetworkInfo(): Observable<NetworkInfo> {
        return this.http.get<NetworkInfo>(url);
    }

}