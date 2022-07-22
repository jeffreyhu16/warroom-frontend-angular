import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/model/instance-data';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent
} from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.css']
})

export class InstanceComponent implements OnInit {

  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  items!: any[];
  formGroup!: FormGroup;

  constructor(private instanceService: InstanceService, private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.instanceService.getInstanceGridData().subscribe(res => {
      this.items = res;
    });
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

  createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new Instance() : args.dataItem;

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

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.items.push(formGroup.value);
      // this.instanceService.addUser(formGroup.value);
    } else {
      this.items[rowIndex] = formGroup.value;
      // this.instanceService.updateUser(formGroup.value);
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    // this.instanceService.removeUser(dataItem.id);
  }
}
