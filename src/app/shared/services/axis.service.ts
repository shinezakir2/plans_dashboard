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
      return this.httpClient.get(`assets/data/operations.json`);
    else
      return this.httpClient.get(`assets/data/axis.json`);
  }
}