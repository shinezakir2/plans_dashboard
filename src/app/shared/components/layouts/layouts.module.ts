import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedComponentsModule } from '../shared-components.module';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

const components = [
  BlankLayoutComponent,
  HeaderLayoutComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule
  ]
})
export class LayoutsModule { }
