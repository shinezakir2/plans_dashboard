import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AxisService {

  constructor(
    private httpClient: HttpClient
  ) { }
  fromJson:boolean=true;
  GetAxis(axisId:any): Observable<any> {
    if(!this.fromJson)
      return this.httpClient.get(`assets/data/axis.json`);
    else
      return this.httpClient.get(`assets/data/axis.json`);
  }
  
  
  GetPlan(planId:any): Observable<any> {
    return this.httpClient.get(`assets/data/plan.json`);
  }
  
  GetStepAttchments(stepId:any): Observable<any> {
    return this.httpClient.get(`assets/data/StepEvidences.json`);
  }
}