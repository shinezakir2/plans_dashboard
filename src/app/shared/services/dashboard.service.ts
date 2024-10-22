import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable()
export class DashboardService {

  constructor(
    private httpClient: HttpClient,
    private configService:ConfigService
  ) { }
  fromJson:boolean=true;
  GetDashboard(): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/MainAxisPlans/GetDashboard`);
    else
    return this.httpClient.get(`assets/data/dashboard.json`);
  }
}