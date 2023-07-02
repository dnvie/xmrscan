import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Search } from '../data/search';


const baseUrl = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
  })
  

export class SearchService {

    constructor(
        private http: HttpClient
    ) { }

    getSearchResult(query: string | null): Observable<Search> {
        return this.http.get<Search>(baseUrl + '/search/' + query);
    }

}