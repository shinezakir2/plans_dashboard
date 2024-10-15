import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadCrumbComponent {
  @Input('links') links: any[]=[];
  @Input('title') title: string='';
}
