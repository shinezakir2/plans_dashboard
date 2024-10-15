import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppService {

  constructor(
    private httpClient: HttpClient
  ) { }

  GetMenu(): Observable<any> {
    return this.httpClient.get(`assets/data/menu.json`);
  }
  
}