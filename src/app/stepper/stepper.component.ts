import { Component, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: "Upload image",
        routerLink: "upload-image"
      }, {
        label: "Fill form",
        routerLink: "fill-form"
      },
      {
        label: "Select from list",
        routerLink: "list"
      }, {
        label: "Summary",
        routerLink: "summary"
      }];
  }

}
