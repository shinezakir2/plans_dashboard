import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Injector, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTransloco, TRANSLOCO_CONFIG, TranslocoConfig } from '@ngneat/transloco';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TranslocoHttpLoader } from './transloco-loader';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { AUTH_URL, LOGIN_URL } from './shared/common/constants';
import { AppService } from './shared/services/app.service';
import { OperationService } from './shared/services/operation.service';
import { SharedPipesModule } from './shared/pipes/shared-pipes.module';
import { AxisService } from './shared/services/axis.service';
import { DashboardService } from './shared/services/dashboard.service';
import { ConfigService } from './shared/services/config.service';

// Function to load configuration before the app starts
export function initConfig(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['ar','en'],
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
          authority: 'https://emstest.adcda.gov.ae/auth', // Get the dynamic authority URL
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
        availableLangs: ['ar','en'],
        defaultLang: 'ar',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    AppService,
    OperationService,
    AxisService,
    ConfigService,
    DashboardService,
    {
      provide: LOGIN_URL,
      useValue: '/sessions/signin'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true
    }    
  ]
};
