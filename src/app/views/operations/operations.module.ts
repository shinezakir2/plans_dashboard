import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { operationsRoutingModule } from './operations-routing.module';
import { OperationsComponentComponent } from './operations-component/operations-component.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxPaginationModule } from 'ngx-pagination';
import { BasicPrimitivesModule } from 'ngx-basic-primitives';

@NgModule({
  declarations: [OperationsComponentComponent],
  imports: [
    CommonModule,
    operationsRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    TranslocoModule,
    NgxPaginationModule,
    BasicPrimitivesModule
  ]
})
export class OperationsModule { }
