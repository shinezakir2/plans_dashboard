import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationsComponentComponent } from './operations-component/operations-component.component';
import { OperationDiagramComponent } from './operation-diagram/operation-diagram.component';

const routes: Routes = [
  {
    path: '',
    component: OperationsComponentComponent
  },
  {
    path: 'operation/:operationId',
    component: OperationDiagramComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class operationsRoutingModule { }
