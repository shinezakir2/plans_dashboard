import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { operationsRoutingModule } from './operations-routing.module';
import { OperationsComponentComponent } from './operations-component/operations-component.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasicPrimitivesModule } from 'ngx-basic-primitives';
import { NgApexchartsModule } from "ng-apexcharts";
import { FormsModule } from '@angular/forms';
import { OperationDiagramComponent } from './operation-diagram/operation-diagram.component';
@NgModule({
  declarations: [OperationsComponentComponent,OperationDiagramComponent],
  imports: [
    CommonModule,
    operationsRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    TranslocoModule,
    NgxPaginationModule,
    BasicPrimitivesModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class OperationsModule { }
