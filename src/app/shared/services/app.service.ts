import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable()
export class AppService {

  constructor(
    private httpClient: HttpClient,
    private configService:ConfigService
  ) { }

  GetMenu(): Observable<any> {
    if(this.configService.isProduction())
      return this.httpClient.get(`${this.configService.getApiUrl()}/MainAxisPlans/GetUserMenu`);
    else
    return this.httpClient.get('assets/data/menu.json');
  }
  
}