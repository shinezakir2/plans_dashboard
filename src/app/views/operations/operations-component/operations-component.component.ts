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
    this.operationService.GetOperation(operationId).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.loadingText = 'loading';
        this.isLoading=false;
        this.bindChart(data);
        this.chartLoaded =true;
        this.bindCrumb();
      }
    });
  }

  bindChart(data:any){
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
        items: [8,6],//[4, 0],
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
        fromItem:6,
        toItem:8,
        color: Colors.Red,
        lineWidth: 3,
      })
    ];
  
  
  
    this.chartItems = [
      new OrgItemConfig({
        id: 0,
        parent: null,
        title: "Operation 1",
        description: "VP, Public Sector",
        image: "./assets/images/o.png",
        context: { phone: "(123) 456-78-90", email: "itema@org.com", icon: "home", color: "primary" },
        templateName: "contactTemplate",
        itemTitleColor: "red"
      }),
      new OrgItemConfig({
        id: 1,
        parent: 0,
        title: "Plan 1",
        description: "VP, Human Resources",
        context: { phone: "(123) 456-78-90", email: "itema@org.com", icon: "home", color: "warn" },
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 2,
        parent: 0,
        title: "Plan 2",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent" },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 3,
        parent: 0,
        title: "Plan 3",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent" },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 4,
        parent: 0,
        title: "Plan 4",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent" },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 5,
        parent: 1,
        title: "Step 1",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent",status:'completed' },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 6,
        parent: 5,
        title: "Step 2",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent",status:'pending' },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 7,
        parent: 6,
        title: "Step 3",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent",status:'completed' },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 8,
        parent: 4,
        title: "Step 1",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent",status:'pending' },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
      }),
      new OrgItemConfig({
        id: 9,
        parent: 2,
        title: "Step 1",
        context: { phone: "(123) 654-78-90", email: "itemc@org.com", icon: "home", color: "accent",status:'pending' },
        description: "Business Solutions, US",
        image: "./assets/images/p.png",
        templateName: "contactTemplate"
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
    return ((completedCount / allCount) * 100)+"%";
  }

  calculateCardClass(allCount:number,completedCount:number): string {
    if (allCount === 0) {
      return "bg-info-subtle";  // Avoid division by zero
    }
    var prec = ((completedCount / allCount) * 100)
    if(prec < 30)
      return 'bg-danger-subtle';
    else if(prec < 50)
      return 'bg-warning-subtle';
    else if(prec < 75)
      return 'bg-success-subtle';
    else if (prec > 80)
      return 'bg-success-subtle';
    return 'bg-info-subtle';

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
