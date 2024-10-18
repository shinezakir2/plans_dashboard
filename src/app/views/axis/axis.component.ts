import { Component, OnInit } from '@angular/core';
import { getTranslate } from '../../shared/common/functions';
import { TranslocoService } from '@ngneat/transloco';
import { ActivatedRoute } from '@angular/router';
import { AxisService } from '../../shared/services/axis.service';
import { AxisModel, PlanModel } from '../../shared/models/axis_model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrl: './axis.component.scss'
})
export class AxisComponent implements OnInit {
  
  isLoading:boolean=true;
  loadingText='loading';
  pageTitle='';
  links:any[]=[];
  chartOptions:any;
  barChartOptions:any;
  axisId:any;
  axisModel:AxisModel = new AxisModel();
  planModel:PlanModel = new PlanModel();
  constructor(private axisService:AxisService,private translocoService:TranslocoService,private route:ActivatedRoute){
    this.axisId = this.route.snapshot.paramMap.get('axisId')?.toString();
  }

  ngOnInit(): void {
    
    this.axisService.GetAxis(this.axisId).subscribe({
      next:(data:AxisModel) =>{
        this.pageTitle = data.subAxisNameAR;
        this.axisModel = data;
        this.bindCharts();
        this.isLoading = false;
        this.bindCrumb();
      }
    });
    
  }


  bindCharts(){
    // var labels = [getTranslate(this.translocoService,'targetedCount'),getTranslate(this.translocoService,'completedCount')];
    var totalCountLabel = "العدد الكلي";
    var completedCountLabel = "العدد المنجز";
    var totalCount = 0,completedCount=0;
    var labels = [totalCountLabel,completedCountLabel];




    var plansData = [];

    for (let i = 0; i < this.axisModel.plans.length; i++) {
      const plan = this.axisModel.plans[i];
      totalCount += plan.targetedCount;
      completedCount += plan.completedCount;
      plansData.push({
        x:plan.planNameAR,
        y:plan.completedCount,
        goals:[
          {
            name:totalCountLabel,
            value:plan.targetedCount,
            strokeWidth: 5,
            strokeColor: "#775DD0"
          }
        ]
      });
    }


    this.chartOptions = {
      series: [totalCount,completedCount],
      labels: labels,
      chart: {
        width: 320,
        type: "pie"
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 10
        }
      },
      grid: {
        padding: {
          bottom: -80
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };


    this.barChartOptions = {
      series: [
        {
          name: completedCountLabel,
          data: plansData
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      colors: ["#00E396"],
      dataLabels: {
        formatter: function (val:any, opts:any) {
          const goals =
            opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
              .goals;

          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`;
          }
          return val;
        }
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: [completedCountLabel, totalCountLabel],
        markers: {
          fillColors: ["#00E396", "#775DD0"]
        }
      }
    };
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


  bindCrumb(){
    this.links = [
      {
        name:this.axisModel.subAxisNameAR,
        active:true,
        href:'/'
      },
      {
        name:this.axisModel.mainAxisAR,
        active:true,
        href:'/'
      },
      {
        name:"home",
        active:false,
        href:'/'
      }
    ];
  }
}
