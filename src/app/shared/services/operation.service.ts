import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class OperationService {

  constructor(
    private httpClient: HttpClient
  ) { }
  fromJson:boolean=true;
  GetOperations(): Observable<any> {
    if(!this.fromJson)
      return this.httpClient.get(`assets/data/operations.json`);
    else
      return this.httpClient.get(`assets/data/operations.json`);
  }
  GetOperationPlans(operationId:any): Observable<any> {
    if(!this.fromJson)
      return this.httpClient.get(`assets/data/plans.json`);
    else
      return this.httpClient.get(`assets/data/plans.json`);
  }
}