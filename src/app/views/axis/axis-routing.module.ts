import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AxisComponent } from './axis.component';

const routes: Routes = [
  {
    path: 'axis/:axisId',
    component: AxisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AxisRoutingModule { }
