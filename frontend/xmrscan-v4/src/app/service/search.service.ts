import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Search } from '../data/search';

const baseUrl = 'https://xmrscan-docker-4ogsjv4w2q-ez.a.run.app'

@Injectable({
    providedIn: 'root'
  })

  export class SearchService {
    constructor(
        private http: HttpClient
    ) { }

    getSearchResult(query: string | null): Observable<Search> {
        return this.http.get<Search>(`${baseUrl}/search/${query}`);
    }

  }

