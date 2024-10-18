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
import { defineElement } from '@lordicon/element'
import { StepDetailsComponent } from './step-details/step-details.component';
@NgModule({
  declarations: [AxisComponent],
  imports: [
    CommonModule,
    AxisRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    TranslocoModule,
    NgxPaginationModule,
    NgApexchartsModule,
    PlanDetailsComponent,
    StepDetailsComponent
  ]
})
export class AxisModule { }
