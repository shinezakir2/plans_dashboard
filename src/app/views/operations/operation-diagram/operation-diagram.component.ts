import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from '../../../shared/services/operation.service';
import { AnnotationType, BackgroundAnnotationConfig, Colors, ConnectorAnnotationConfig, ConnectorLabelPlacementType, ConnectorPlacementType, ConnectorShapeType, Enabled, GroupByType, HighlightPathAnnotationConfig, LineType, OrgItemConfig, PageFitMode, Thickness } from 'ngx-basic-primitives';

@Component({
  selector: 'app-operation-diagram',
  templateUrl: './operation-diagram.component.html',
  styleUrl: './operation-diagram.component.scss'
})
export class OperationDiagramComponent {
  isLoading:boolean=true;
  loadingText='loading';
  operationId!:any;
  pageTitle='operations';
  links:any[]=[];

  chartAnnotations:any[]=[];
  chartItems:any[] = [];
  PageFitMode = PageFitMode;
  Enabled = Enabled;
  LineType = LineType;
  GroupByType = GroupByType;
  isFromClick=false;

  constructor(private operationService:OperationService,private route:ActivatedRoute){
    this.operationId = this.route.snapshot.paramMap.get('operationId')?.toString();
    if(this.operationId!=null)
    {
      this.loadOperationChart(this.operationId);
    }
  }


  loadOperationChart(operationId:any){
    this.loadingText = 'load_chart_data';
    this.isLoading=true;
    this.operationService.GetOperationPlans(operationId).subscribe({
      next:(data:any)=>{
        this.loadingText = 'loading';
        this.isLoading=false;
        this.bindChart(data);
        this.bindCrumb();
      }
    });
  }

  allSteps:any =[];
  bindChart(data:any){ 
    console.log('data',data);
    this.chartItems.push(new OrgItemConfig({
      id: data.id,
      parent: null,
      title: data.name,
      context: { 
        type: "operation",
        plansCount: data.plansCount,
        completedPlans: data.completedPlans,
        startDate:data.startDate,
        endDate:data.endDate
      },
      templateName: "operationTemplate"
    }));

    console.log('this.allSteps',data.plans);

    for (let index = 0; index < data.plans.length; index++) {
      const plan = data.plans[index];
      this.chartItems.push(
        new OrgItemConfig({
          id: plan.id,
          parent: plan.operationId,
          title: plan.planNameAR,
          context: { 
            type: "plan",
            planStatus:plan.planStatus,
            startDate:plan.startDate,
            endDate:plan.endDate,
            targetedCount:plan.targetedCount,
            completedCount:plan.completedCount,
            budget:plan.budget,
            remainingAmount:plan.remainingAmount,
            spentAmount:plan.spentAmount,
            responsibleOfficer:plan.responsibleOfficer,
            monitoringOfficer:plan.monitoringOfficer,
          },
          templateName: "planTemplate"
        })
      );
      if(plan.planSteps != undefined){
        for (let index = 0; index < plan.planSteps.length; index++) {
          this.allSteps.push(plan.planSteps[index]);
        }
      }
    }

    for (let index = 0; index < this.allSteps.length; index++) {
      var step = this.allSteps[index];
        this.chartItems.push(
        {
          id: step.id,
          parent: step.parentId,
          title: step.stepName,
          context: { 
            type: "step",
            nextSteps: step.nextSteps,
            completedPercentage: step.completedPercentage,
            startDate: step.startDate,
            endDate: step.endDate,
            stepWeight: step.stepWeight,
          },
          templateName: "stepTemplate"
        }
      );

      
      // //chartAnnotations
      // if(step.nextSteps!=undefined){
      //   if(step.nextSteps.length>0){
      //     for (let i = 0; i < step.nextSteps.length; i++) {
      //       const nextStep = step.nextSteps[i];
      //       console.log('nextStep',nextStep);
      //       this.chartAnnotations.push(
      //         new ConnectorAnnotationConfig({
      //           annotationType: AnnotationType.Connector,
      //           lineType:LineType.Solid,
      //           connectorPlacementType:ConnectorPlacementType.Offbeat,
      //           label:'sss',
      //           fromItem:step.id,
      //           toItem:nextStep,
      //           color: Colors.DarkGreen,
      //           lineWidth: 1
      //         })
      //       );
            
      //     }
      //   }
      // }
    }
  
    
  }


  onChartMouseLeave(event:Event){
    console.log(1500);
    console.log('event',event)
    !this.isFromClick?this.chartAnnotations=[]:this.chartAnnotations=this.chartAnnotations;
  }

  onChartClick(event: Event, itemConfig: OrgItemConfig,isFromClick:boolean) {
    //event.stopPropagation();
   // console.log('isFromClick',isFromClick);
    this.isFromClick = isFromClick;
    //console.log('itemConfig',itemConfig)
    if(itemConfig.templateName == "stepTemplate"){
      this.chartAnnotations = [];
      //alert(`User clicked on cursor button for node ${itemConfig.title}`)
      //chartAnnotations
      var nextSteps:any[] = itemConfig.context.nextSteps;
      var stepId = itemConfig.id;
      if(nextSteps!=undefined){
        if(nextSteps.length>0){
          for (let i = 0; i < nextSteps.length; i++) {
            const nextStep = nextSteps[i];
            this.chartAnnotations.push(
              new ConnectorAnnotationConfig({
                annotationType: AnnotationType.Connector,
                lineType:LineType.Solid,
                connectorPlacementType:ConnectorPlacementType.Offbeat,
                label:'',
                fromItem:stepId,
                toItem:nextStep,
                color: Colors.DarkGreen,
                lineWidth: 1
              })
            );
            
          }
        }
      }
    }
    
  }


  calculatePrecentage(count:number,completedCount:number): number {
    if (count === 0) {
      return 0;  // Avoid division by zero
    }
    var percentage = Math.floor(((completedCount / count) * 100));
    return percentage;
  }

  calculateClass(allCount:number,completedCount:number): string {
    if (allCount === 0) {
      return "info";  // Avoid division by zero
    }
    var prec = ((completedCount / allCount) * 100)
    if(prec < 50)
      return 'danger';
    else if(prec > 50  && prec < 70)
      return 'warning';
    else if(prec > 70)
      return 'success';
    else if (prec > 80)
      return 'success';
    return 'info';

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
  

  bindCrumb(){
    this.pageTitle='plan_chart';
      this.links = [
        {
          name:"plan_chart",
          active:true,
          href:'/operations/'
        },
        {
          name:"operations",
          active:false,
          href:'/operations'
        },
        {
          name:"home",
          active:false,
          href:'/'
        }
      ];
  }
}
