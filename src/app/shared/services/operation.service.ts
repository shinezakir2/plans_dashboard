import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class OperationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  GetOperations(): Observable<any> {
    return this.httpClient.get(`assets/data/operations.json`);
  }
  GetOperation(operationId:any): Observable<any> {
    return this.httpClient.get(`assets/data/operation.json`);
  }
}