import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) { }
  fromJson:boolean=true;
  GetDashboard(): Observable<any> {
    return this.httpClient.get(`assets/data/dashboard.json`);
  }
}