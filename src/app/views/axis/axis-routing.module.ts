import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AxisComponent } from './axis.component';
import { PlanDetailsComponent } from './plan-details/plan-details.component';

const routes: Routes = [
  {
    path: 'subaxis/:axisId',
    component: AxisComponent
  },
   {
    path: 'plan/:planId',
    component: PlanDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AxisRoutingModule { }
