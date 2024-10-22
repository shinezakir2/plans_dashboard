import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EnvModel,Env } from '../models/env_model'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config!: Env;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return firstValueFrom(this.http.get('/assets/env.json'))
      .then((data) => {

        console.log('data',data);
        var envObject = data as EnvModel;
        console.log('envObject',envObject);


        var config = envObject.env.filter((value: Env,index:number)=>{
            return envObject.production == value.is_production
        });
        console.log('config',config);
        this.config = config[0];

      });
  }

  getConfig(): any {
    return this.config;
  }

  getApiUrl(): string {
    return this.config.apiUrl;
  }
  authorityURL(): string {
    return this.config.authorityURL;
  }
  
  isProduction(): boolean {
    return this.config.is_production;
  }
}


