import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponentComponent } from './operations-component/operations-component.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponentComponent
  },
  {
    path: ':operationId',
    component: OperationsComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class operationsRoutingModule { }
