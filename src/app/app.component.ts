import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { LOGIN_URL } from './shared/common/constants';
import { ConfigService } from './shared/services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'plans_dashboard';
  userData$: Observable<any> = of({});
    isAuthenticated = false;
    constructor(private router: Router,private oidcSecurityService: OidcSecurityService,@Inject(LOGIN_URL) private loginUrl: string) { }

    ngOnInit() {
    
        this.userData$ = this.oidcSecurityService.userData$;
        this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
            if(!isAuthenticated){
               if(this.router.url != this.loginUrl)
              {
                this.router.navigateByUrl(this.loginUrl);
              }
            }
            else{
                this.isAuthenticated = isAuthenticated;
                //debugger;
                //console.log('app authenticated', isAuthenticated);
                //this.router.navigateByUrl('/operations');
            }
        });
    }
}
