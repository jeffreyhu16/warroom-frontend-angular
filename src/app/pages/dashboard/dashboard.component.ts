import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GridEditService } from "src/app/services/grid-edit.service";
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
} from "@progress/kendo-angular-grid";

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

  constructor(private gridEditService: GridEditService) { }

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
  }

  addHandler({ sender }: AddEvent): void {
    const group = new FormGroup({
      server: new FormControl(),
      dashboard: new FormControl(),
      dashboardAlias: new FormControl(),
      groupName: new FormControl()
    });
    sender.addRow(group);
  }

  editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    const group = new FormGroup({
      server: new FormControl(dataItem.server),
      dashboard: new FormControl(dataItem.dashboard),
      dashboardAlias: new FormControl(dataItem.dashboardAlias),
      groupName: new FormControl(dataItem.groupName)
    });
    sender.editRow(rowIndex, group);
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    if (isNew) {
      formGroup.value.id = this.items.length;
      this.items.push(formGroup.value);
      this.loadItems();
    } else {
      for (let key in formGroup.value) {
        this.items[rowIndex][key] = formGroup.value[key];
      }
    }
    sender.closeRow(rowIndex);
    this.gridEditService.emitChange(this.items);
    console.log('saveHandler: ', this.items);
  }

  cancelHandler({ sender, rowIndex }: CancelEvent): void {
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem }: RemoveEvent): void {
    console.log(dataItem);
  }
}
