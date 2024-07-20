import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Blocks } from '../data/blocks';
import { Block } from '../data/block';
import { Mempool } from '../data/mempool';

const baseUrl = 'https://xmrscan-docker-4ogsjv4w2q-ez.a.run.app'

@Injectable({
    providedIn: 'root'
  })

  export class BlocksService {
    constructor(
        private http: HttpClient
    ) { }

    getBlocks(page: number): Observable<Blocks> {
        if (page < 0 || page == undefined || page == null) {
            page = 0;
        }
        return this.http.get<Blocks>(`${baseUrl}/blocks/${page}`);
    }

    getBlock(height: string): Observable<Block> {
        return this.http.get<Block>(`${baseUrl}/block/${height}`);
    }

    getMempool(): Observable<Mempool> {
        return this.http.get<Mempool>(`${baseUrl}/mempool`);
    }
  }