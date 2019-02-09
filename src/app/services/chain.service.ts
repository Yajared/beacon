import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

const apiEndpoint = environment.apiAddress;

@Injectable({
  providedIn: 'root'
})
export class ChainService {
  constructor(private httpClient: HttpClient) {
  }

  getChain(security: string, expiration? : number): Observable<any> {
    return this.httpClient.get(apiEndpoint + 'getChain/', {
      params: {
        'security': security,
        'expiration': expiration ? expiration.toString() : ''
      }
    });
  }

  getAllChains(security: string): Observable<any> {
    return this.httpClient.get(apiEndpoint + 'getAllChains/', {
      params: {
        'security': security
      }
    });
  }
}
