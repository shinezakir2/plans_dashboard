import { Component, Input, OnInit } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PlanStepModel } from '../../../shared/models/step_model';

@Component({
  selector: 'app-step-details',
  standalone: true,
  imports: [TranslocoModule,NgApexchartsModule],
  templateUrl: './step-details.component.html',
  styleUrl: './step-details.component.scss'
})
export class StepDetailsComponent implements OnInit {
  chartOptions:any;
  @Input('stepModel') stepModel: PlanStepModel = new PlanStepModel();


  ngOnInit(): void {
    this.chartOptions = {
      series: [this.stepModel.completedPercentage, this.stepModel.stepWeight],
      chart: {
        height: 250,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "50%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff"],
      labels: ["نسبة الإكتمال", "الوزن"],
      legend: {
        show: true,
        floating: true,
        fontSize: "12px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName:any, opts:any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }
  
}
