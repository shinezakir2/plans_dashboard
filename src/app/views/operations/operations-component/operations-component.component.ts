import { Component, OnInit } from '@angular/core';
import { OperationService } from '../../../shared/services/operation.service';
import { AnnotationType, Colors,Enabled , ConnectorAnnotationConfig, ConnectorPlacementType, LineType, OrgItemConfig, PageFitMode, GroupByType, HighlightPathAnnotationConfig } from 'ngx-basic-primitives';
import { ActivatedRoute } from '@angular/router';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';
import { OperationModel } from '../../../shared/models/operations_model';

@Component({
  selector: 'app-operations-component',
  templateUrl: './operations-component.component.html',
  styleUrl: './operations-component.component.scss'
})


export class OperationsComponentComponent implements OnInit  {
  isLoading:boolean=true;
  loadingText='loading';

  totalRecords:number= 0;
  limit:number= 12;
  currentPage:number=1;
  allOperations:OperationModel[]=[];
  operations:OperationModel[]=[];
  pageTitle='operations';
  links:any[]=[];
  filterTerm:string='';

  constructor(private operationService:OperationService){
    
  }
  
  ngOnInit(): void {
    this.getOperations();

    this.bindCrumb();
  }

  getOperations(){
    this.isLoading=false;
    this.operationService.GetOperations().subscribe({
      next:(data:OperationModel[])=>{
        this.allOperations = data;
        this.operations = data;
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
