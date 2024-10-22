import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable()
export class OperationService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) { }
  fromJson:boolean=true;
  GetOperations(): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/MainAxisPlans/GetOperations`);
    else
      return this.httpClient.get(`assets/data/operations.json`);
  }
  GetOperationPlans(operationId:any): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/MainAxisPlans/GetOperationById/${operationId}`);
    else
      return this.httpClient.get(`assets/data/plans.json`);
  }
}