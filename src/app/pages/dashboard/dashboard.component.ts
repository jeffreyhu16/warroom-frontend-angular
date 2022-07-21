import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Dashboard } from 'src/app/model/dashboard-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() public items!: any[];

  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.gridData = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    }
  }

  createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new Dashboard() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      alias: item.alias,
      type: item.type,
      ip: item.ip,
      username: item.username,
      password: item.password,
      authenticate: item.authenticate
    });
    return this.formGroup;
  }
}
