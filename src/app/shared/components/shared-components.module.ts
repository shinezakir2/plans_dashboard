import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './layouts/layouts.module';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TranslocoModule } from '@ngneat/transloco';
import { BreadCrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedPipesModule } from '../pipes/shared-pipes.module';

const components = [
  BtnLoadingComponent,
  LoadingSpinnerComponent,
  BreadCrumbComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    LayoutsModule,
    TranslocoModule
  ]
})
export class SharedComponentsModule { }
