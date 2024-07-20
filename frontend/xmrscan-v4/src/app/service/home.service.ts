import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Home } from '../data/home';

const baseUrl = 'https://xmrscan-docker-4ogsjv4w2q-ez.a.run.app'

@Injectable({
    providedIn: 'root'
  })

  export class HomeService {
    constructor(
        private http: HttpClient
    ) { }

    getHome(): Observable<Home> {
        return this.http.get<Home>(`${baseUrl}/`);
    }
  }

