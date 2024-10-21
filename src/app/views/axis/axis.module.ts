import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";
import { AxisComponent } from './axis.component';
import { AxisRoutingModule } from './axis-routing.module';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { StepDetailsComponent } from './step-details/step-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [AxisComponent,PlanDetailsComponent],
  imports: [
    CommonModule,
    AxisRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    TranslocoModule,
    NgxPaginationModule,
    NgApexchartsModule,
    StepDetailsComponent,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 8,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ]
})
export class AxisModule { }
