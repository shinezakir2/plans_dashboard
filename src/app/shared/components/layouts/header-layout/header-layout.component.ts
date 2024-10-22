import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../../services/app.service';
import { MenuDTO, SubAxi } from '../../../models/menu_model';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent implements OnInit{
  userData$: Observable<any> = of({});
  menuLoaded:boolean=false;
  name:any;
  fullname:any;
  email:any;
  isAuthenticated = false;
  menuItems:MenuDTO[] = [];
  private headers: HttpHeaders = new HttpHeaders();
  
  constructor(private securityService: OidcSecurityService,private appService:AppService){
    this.menuItems = [];
  }

  ngOnInit(): void {

    this.getMenuData();
    this.userData$ = this.securityService.userData$;
    this.securityService.getAccessToken().subscribe((token) => {
      if (token !== '') {
          let decodedJWT = JSON.parse(window.atob(token.split('.')[1]))
          this.name=decodedJWT.username;
          this.fullname=decodedJWT.fullname;
          this.email=decodedJWT.email;
          this.isAuthenticated = true;
         // debugger;
      }
    });
  }


  getMenuData() {
    this.headers.append("ngrok-skip-browser-warning", "true");
    
    this.appService.GetMenu().subscribe({
      next:(data:MenuDTO[]) => {
        this.menuItems = data;
        this.addCustomMenu();

        this.menuLoaded=true;
      }
    })
  }

  public logout(): void {
    this.securityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
  }

  addCustomMenu(){
    var operations = new MenuDTO();
    operations.href ='/operations';
    operations.axisNameAR ='operations';
    operations.axisNameAR='operations';
    operations.id=0;
    this.menuItems.push(operations);

    var home = new MenuDTO();
    home.href ='/';
    home.axisNameAR ='home';
    home.axisNameAR='home';
    home.id=-1;
    this.menuItems.push(home);
  }
}
