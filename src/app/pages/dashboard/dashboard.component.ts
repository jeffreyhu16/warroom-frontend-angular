import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Dashboard } from 'src/app/model/dashboard-data';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent
} from "@progress/kendo-angular-grid";
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() public roleId!: number;
  @Input() public items!: any[];

  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  formGroup!: FormGroup;
  editedRowIndex?: number;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.gridData = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    }
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  createFormGroup(dataItem: any): FormGroup {
    const item = dataItem;
    
    this.formGroup = this.formBuilder.group({
      dashboard_id: item.dashboard_id,
      dashboard_name: item.dashboard_name,
      description: item.description,
      instance_name: item.instance_name,
      menu_name: item.menu_name
    });
    return this.formGroup;
  }

  addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    const newDash = new Dashboard();
    this.formGroup = this.createFormGroup(newDash);

    sender.addRow(this.formGroup);
  }

  editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;
    // console.log(this.formGroup)
    sender.editRow(rowIndex, this.formGroup);
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.items.push(formGroup.value);
      // this.dashboardService.addDashboard(formGroup.value);
    } else {
      this.items[rowIndex] = formGroup.value;
      // this.dashboardService.updateDashboard(formGroup.value);
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    // this.dashboardService.removeDashboard(dataItem.id);
  }

  cancelHandler({ sender, rowIndex }: CancelEvent): void {
    this.closeEditor(sender, rowIndex);
  }

  closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    // this.formGroup = undefined;
  }
}
