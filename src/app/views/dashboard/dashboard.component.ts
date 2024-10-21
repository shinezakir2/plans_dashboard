import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';
import { DashboardModel, PlanPhase, SubAxi } from '../../shared/models/dashboard_model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public chartOptions: any;
  dashboardModel: DashboardModel =new DashboardModel();
  subAxis:SubAxi[] = [];
  plans:PlanPhase[] = [];
  allPlans:PlanPhase[] = [];
  isLoading= true;
  completedPlans=0;
  pendingPlans=0;
  notStartedPlans=0;
  selectedPlanStatus = 0;
  totalRecords:number= 0;
  limit:number= 6;
  currentPage:number=1;
  filterTerm:any='';
  constructor(private dashboardService:DashboardService){}
  ngOnInit() {
    this.isLoading = true;
    this.dashboardService.GetDashboard().subscribe({
      next:(data:DashboardModel) => {
       
        this.dashboardModel = data;
        this.processData();
      },
    })

    
  }

  processData(){
    for (let index = 0; index < this.dashboardModel.data.length; index++) {
      const axis = this.dashboardModel.data[index];
      
      for (let i = 0; i < axis.subAxis.length; i++) {
        const subAxis = axis.subAxis[i];
        this.subAxis.push(subAxis);
        this.plans = this.plans.concat(subAxis.planPhases);
      }
    }
    this.allPlans = this.plans;
    this.completedPlans = this.plans.filter(item => item.planStatus === 1).length;
    this.pendingPlans = this.plans.filter(item => item.planStatus === 2).length;
    this.notStartedPlans = this.plans.filter(item => item.planStatus === 3).length;
    this.bindChart();
    this.isLoading = false; 
  }

  bindChart(){
    this.chartOptions = {
      series: [this.completedPlans, this.pendingPlans,this.notStartedPlans],
      chart: {
        width: 500,
        type: "pie"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


  filterPlans(){
    if(this.filterTerm.length > 0){
      this.plans = this.allPlans.filter(item => item.planNameAR!.toLowerCase().includes(this.filterTerm.toLowerCase()) && item.planStatus == this.selectedPlanStatus);
    }else{
      this.plans = this.allPlans.filter(item => this.selectedPlanStatus!=0?item.planStatus == this.selectedPlanStatus:true);
    }
  }

  getPlanStatusClass(planStatus:any):string{
    if(planStatus == 1){
      return 'bg-success-subtle text-success';
    }else if(planStatus == 2){
      return 'bg-warning-subtle text-warning';
    }else if(planStatus == 3){
      return 'bg-danger-subtle text-danger';
    }
    return 'bg-primary-subtle text-primary';
  }

    // Handle page change
  onPage(event: any) {
    this.currentPage = event;
    //this.fetchRequestData();
  }
}
