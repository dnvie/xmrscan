import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Block } from '../data/block';
import { Blocks } from '../data/blocks';


const baseUrl = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
  })
  

export class BlocksService {

    constructor(
        private http: HttpClient
    ) { }

    getBlocks(page: number | undefined): Observable<Blocks> {
        if (page == undefined) {
            return this.http.get<Blocks>(baseUrl + '/blocks');
        } else {
            return this.http.get<Blocks>(baseUrl + '/blocks/' + page);
        }
    }

    getBlock(height: string | null): Observable<Block> {
        return this.http.get<Block>(baseUrl + '/block/' + height);
    }

}