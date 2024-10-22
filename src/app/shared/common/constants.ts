import { InjectionToken } from '@angular/core';

export const SCENARIO_DEFAULT = 'default';
export const SCENARIO_CREATE = 'create';
export const SCENARIO_UPDATE = 'update';

export const DATA_STATUS_SUCCESS = 'success';
export const DATA_STATUS_FAIL = 'fail';
export const DATA_STATUS_ERROR = 'error';

export const HOME_URL = new InjectionToken<string>('homeUrl');
export const Request_Sent_Success_URL = new InjectionToken<string>('requestsent');

export const LOGIN_URL = new InjectionToken<string>('loginUrl');

export const AUTH_URL = new InjectionToken<string>('authorityURL');

export const STYLE_HOST = new InjectionToken<Node>('styleHost');

export const TIME_RANGE_SEPARATOR = new InjectionToken<Node>('timeRangeSeparator');