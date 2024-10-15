import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

constructor(private _oidcSecurityService:OidcSecurityService){}
  loginSSO() {
    this._oidcSecurityService.authorize();
  }
}
