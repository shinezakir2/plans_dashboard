import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslocoModule,
    NgxPaginationModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class DashboardModule { }
