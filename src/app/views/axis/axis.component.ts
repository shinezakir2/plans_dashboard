import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrl: './axis.component.scss'
})
export class AxisComponent implements OnInit {
  
  isLoading:boolean=true;
  loadingText='loading';

  pageTitle='axisrrrrr';
  links:any[]=[];

  ngOnInit(): void {
    this.isLoading = false;
  }
}
