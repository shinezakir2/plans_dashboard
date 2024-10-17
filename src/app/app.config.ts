import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTransloco, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TranslocoHttpLoader } from './transloco-loader';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';
import { LOGIN_URL } from './shared/common/constants';
import { AppService } from './shared/services/app.service';
import { OperationService } from './shared/services/operation.service';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['ar'],
        defaultLang: 'ar',
        reRenderOnLangChange: true
      } as TranslocoConfig,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     importProvidersFrom([
      HttpClientModule,
      SharedModule,
      SharedPipesModule,
      AuthModule.forRoot({
        config: {
          authority:  environment.authorityURL,
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: 'angularclient',
          scope: 'openid profile email',
          responseType: 'code',
          silentRenew: true,
          renewTimeBeforeTokenExpiresInSeconds: 10,
          useRefreshToken: true,
          logLevel: LogLevel.Debug,
        },
      })
     ]),
     provideTransloco({
      config: { 
        availableLangs: ['en','ar'],
        defaultLang: 'ar',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    AppService,
    OperationService,
    {
      provide: LOGIN_URL,
      useValue: '/sessions/signin'
    }
  ]
};
