import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable()
export class AxisService {

  constructor(
    private httpClient: HttpClient,
    private configService:ConfigService
  ) { }
  fromJson:boolean=true;
  GetSubAxis(subAxisId:any): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/MainAxisPlans/GetUserSubAxisById/${subAxisId}`);
    else
      return this.httpClient.get(`assets/data/subaxis.json`);
  }
  
  
  GetPlan(planId:any): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/MainAxisPlans/GetUserPlanById/${planId}`);
    else
    return this.httpClient.get(`assets/data/plan.json`);
  }
  
  GetStepAttchments(stepId:any): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/StepEvidences/Step/${stepId}`);
    else
    return this.httpClient.get(`assets/data/StepEvidences.json`);
  }
}