import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';

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
    RouterModule,
    SharedPipesModule
]
})
export class LayoutsModule { }
