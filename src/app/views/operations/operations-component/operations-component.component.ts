import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../../shared/services/operation.service';
import { AnnotationType, Colors,Enabled , ConnectorAnnotationConfig, ConnectorPlacementType, HighlightPathAnnotationConfig, LineType, OrgItemConfig, PageFitMode, GroupByType } from 'ngx-basic-primitives';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operations-component',
  templateUrl: './operations-component.component.html',
  styleUrl: './operations-component.component.scss'
})
export class OperationsComponentComponent implements OnInit {
  isLoading:boolean=true;
  loadingText='loading';

  totalRecords:number= 20;
  limit:number= 12;
  currentPage:number=1;
  operations:any[]=[];
  operationId!:any;
  pageTitle='operations';
  links:any[]=[];

  //chart
  chartLoaded=false;
  chartAnnotations:any[]=[];
  chartItems:any[] = [];
  PageFitMode = PageFitMode;
  Enabled = Enabled;
  LineType = LineType;
  GroupByType = GroupByType;
  //chart

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
        this.operations = data.operations;
        this.totalRecords = this.operations.length;
        console.log(this.operations);
      }
    });
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
    this.chartItems = [
      new OrgItemConfig({
        id: 1,
        parent: null,
        title: "إستقطاب الدارسيين ( الروتا)",
        description: "",
        context: { 
          type: "operation",
          plansCount: "3",
          completedPlans: "3",
          id: "1"
        },
        templateName: "operationTemplate",
        image: "",
        itemTitleColor: "red"
      })
    ];

    for (let index = 0; index < data.plans.length; index++) {
      const plan = data.plans[index];
      this.chartItems.push(
        {
          id: plan.id,
          parent: plan.operationId,
          title: plan.planNameAR,
          description: "",
          context: { 
            type: "plan",
            plansCount: "3",
            completedPlans: "3",
            id: "1"
          },
          templateName: "planTemplate",
          image: "",
          itemTitleColor: "red"
        }
      );
      if(plan.steps != undefined){
        for (let index = 0; index < plan.steps.length; index++) {
          this.allSteps.push(plan.steps[index]);
        }
      }
    }


  for (let index = 0; index < this.allSteps.length; index++) {
    var step = this.allSteps[index];
    console.log('this.allSteps',step)
      this.chartItems.push(
      {
        id: step.id,
        parent: step.parentId,
        title: step.stepName,
        description: "",
        context: { 
          type: "step",
          plansCount: "3",
          completedPlans: "3",
          id: "1"
        },
        templateName: "stepTemplate",
        image: "",
        itemTitleColor: "red"
      }
    );
  }
  
    this.chartAnnotations = [
      new HighlightPathAnnotationConfig({
        annotationType: AnnotationType.HighlightPath,
        items: [],//[5, 0],
        color: Colors.Navy,
        lineWidth: 12,
        opacity: 0.3,
        showArrows: false
      }),
      new HighlightPathAnnotationConfig({
        annotationType: AnnotationType.Background,
        items: [334,337],//[4, 0],
        color: Colors.Red,
        lineWidth: 2,
        opacity: 1,
        showArrows: true
      }),
      new ConnectorAnnotationConfig({
        annotationType: AnnotationType.Connector,
        lineType:LineType.Dashed,
        connectorPlacementType:ConnectorPlacementType.Offbeat,
        label:'Waiting for',
        fromItem:335,
        toItem:337,
        color: Colors.Red,
        lineWidth: 3,
      })
    ];
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


  calculateProgress(allCount:number,completedCount:number): string {
    if (allCount === 0) {
      return 0+"%";  // Avoid division by zero
    }
    var percentage = Math.floor(((completedCount / allCount) * 100));
    return percentage+"%";
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
