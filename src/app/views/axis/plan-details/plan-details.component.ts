import { Component, OnInit } from '@angular/core';
import { PlanModel } from '../../../shared/models/axis_model';
import { formatDate } from '@angular/common';
import { AxisService } from '../../../shared/services/axis.service';
import { ActivatedRoute } from '@angular/router';
import { StepEvidences } from '../../../shared/models/step_evidences';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrl: './plan-details.component.scss'
})
export class PlanDetailsComponent implements OnInit {
  planModel: PlanModel =new PlanModel();
  planId:any;
  timelineAlign:any = 'left';
  isLoading:boolean=true;
  isAttachmentLoading:boolean=true;
  stepEvidences:StepEvidences[] =[];
  loadingText='loading';
  pageTitle='';
  links:any[]=[];



  constructor(private asixService:AxisService,private route:ActivatedRoute){
    this.planId = this.route.snapshot.paramMap.get('planId')?.toString();
  }

  ngOnInit(): void {
    this.asixService.GetPlan(this.planId).subscribe({
      next:(data:PlanModel)=> {
        this.planModel = data;
       this.bindCrumb();
       this.isLoading = false;
      },
    });
  }


  getAttchments(stepId:any){
    this.isAttachmentLoading = true;
    this.asixService.GetStepAttchments(stepId).subscribe({
      next:(data:StepEvidences[])=> {
        console.log(data);
        this.stepEvidences = data;
       this.isAttachmentLoading = false;
      },
    });
  }


  convertBitsToMB(bits: number): number {
    const bytes = bits / 8;               // Convert bits to bytes
    const megabytes = bytes / 1048576;     // Convert bytes to megabytes
    return megabytes;
  }
  

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

  changeAlignValue(){
    if(this.timelineAlign=='left'){
      this.timelineAlign='right'
    }else{
      this.timelineAlign='left'
    }
  }

  getOuterPrecntColor(prec:any):string{
    if(prec < 50){
      return '#f06548';
    }else if(prec >= 50 && prec < 75)
      return '#f7b84b';
    else if(prec >= 75)
      return '#0ab39c';
    else
      return '#fde8e4';
  }

  getInnerPrecntColor(prec:any):string{
    if(prec < 50){
      return '#fde8e4';
    }
    else if(prec >= 50 && prec < 75)
      return '#fef4e4';
    else if(prec >= 75)
      return '#c2f5ed';
    else
      return '#fde8e4';
  }

  bindCrumb(){
    this.links = [
      {
        name:this.planModel.planNameAR,
        active:true,
        href:'/'
      },
      {
        name:this.planModel.subAxisName,
        active:false,
        href:'/axis/'+this.planModel.subAxisId
      },
      {
        name:"home",
        active:false,
        href:'/'
      }
    ];
  }
}
