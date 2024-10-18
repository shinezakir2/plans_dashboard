import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { AxisModel, PlanModel } from '../../../shared/models/axis_model';
import { CommonModule, formatDate } from '@angular/common';
import { StepDetailsComponent } from '../step-details/step-details.component';

@Component({
  selector: 'app-plan-details',
  standalone: true,
  imports: [ TranslocoModule,CommonModule,StepDetailsComponent ],
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.scss'
})
export class PlanDetailsComponent {
  @Input('planModel') planModel: PlanModel = new PlanModel();

  getPlanStatusClass(planStatus:number):string{
    if(planStatus == 1){
      return 'bg-success-subtle text-success';
    }else if(planStatus == 2){
      return 'bg-warning-subtle text-warning';
    }else if(planStatus == 3){
      return 'bg-danger-subtle text-danger';
    }
    return 'bg-primary-subtle text-primary';
  }

  getStatusOverwrite(status: number, startdate: string, enddate: string): string {

    var  now =  formatDate(new Date(),'yyyy-MM-dd','en_US');
    var  enddate1 =  formatDate(enddate,'yyyy-MM-dd','en_US');
    if (enddate1<now && status==1){
        return "ontime";
    }

    if (enddate1>now && status==1){
        return "early";
    }

    if (enddate1>now && status!=1){
        return "ontime";
    }
    else  if (enddate1<now && status==2){
        return "delayed"; //
    }
    else  if (enddate1<now && status==3){
        return "delayed";
    }
    else
    {
        return "ontime";
    } 
  }
}
