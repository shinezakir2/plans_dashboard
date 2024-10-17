import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../../shared/services/operation.service';
import { AnnotationType, Colors,Enabled , ConnectorAnnotationConfig, ConnectorPlacementType, LineType, OrgItemConfig, PageFitMode, GroupByType, HighlightPathAnnotationConfig } from 'ngx-basic-primitives';
import { ActivatedRoute } from '@angular/router';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

@Component({
  selector: 'app-operations-component',
  templateUrl: './operations-component.component.html',
  styleUrl: './operations-component.component.scss'
})


export class OperationsComponentComponent implements OnInit  {
  isLoading:boolean=true;
  loadingText='loading';

  totalRecords:number= 20;
  limit:number= 12;
  currentPage:number=1;
  allOperations:any[]=[];
  operations:any[]=[];
  operationId!:any;
  pageTitle='operations';
  links:any[]=[];
  filterTerm:string='';
  //chart
  chartLoaded=false;
  chartAnnotations:any[]=[];
  chartItems:any[] = [];
  PageFitMode = PageFitMode;
  Enabled = Enabled;
  LineType = LineType;
  GroupByType = GroupByType;

  constructor(private operationService:OperationService,private route:ActivatedRoute){
    this.operationId = this.route.snapshot.paramMap.get('operationId')?.toString();
    if(this.operationId!=null)
    {
      this.loadOperationChart(this.operationId);
    }
  }
  
  ngOnInit(): void {
    this.getOperations();

    this.bindCrumb();
  }

  getOperations(){
    this.isLoading=false;
    this.operationService.GetOperations().subscribe({
      next:(data:any)=>{
        this.allOperations = data.operations;
        this.operations = data.operations;
        this.totalRecords = this.operations.length;
        console.log(this.operations);
      }
    });
  }

  filterOperations(){
    if(this.filterTerm.length > 0){
      this.operations = this.allOperations.filter(item => item.name.toLowerCase().includes(this.filterTerm.toLowerCase()));
    }else{
      this.operations = this.allOperations;
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
        this.chartLoaded =true;
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
      if(plan.steps != undefined){
        for (let index = 0; index < plan.steps.length; index++) {
          this.allSteps.push(plan.steps[index]);
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

      //chartAnnotations
      if(step.nextSteps!=undefined){
        if(step.nextSteps.length>0){
          for (let i = 0; i < step.nextSteps.length; i++) {
            const nextStep = step.nextSteps[i];
            console.log('nextStep',nextStep);
            this.chartAnnotations.push(
              new ConnectorAnnotationConfig({
                annotationType: AnnotationType.Connector,
                lineType:LineType.Solid,
                connectorPlacementType:ConnectorPlacementType.Offbeat,
                label:'',
                fromItem:step.id,
                toItem:nextStep,
                color: Colors.DarkGreen,
                lineWidth: 1
              })
            );
            
          }
        }
      }
    }
    console.log(this.chartAnnotations);
  
    
  }

  onChartClick(event: Event, itemConfig: OrgItemConfig) {
    event.stopPropagation();
    alert(`User clicked on cursor button for node ${itemConfig.title}`)
  }

  // Handle page change
  onPage(event: any) {
    this.currentPage = event;
    //this.fetchRequestData();
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
    if(this.chartLoaded){
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
    }else{
      this.pageTitle='operations';
      this.links = [
        {
          name:"operations",
          active:true,
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
  
}
