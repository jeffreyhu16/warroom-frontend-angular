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
  editedRowIndex?: number;

  constructor(private instanceService: InstanceService, private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.instanceService.getInstances().subscribe(res => {
      this.items = res;
      this.loadItems();
    });
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
      instance_id: item.instance_id,
      name: item.alias,
      type: item.type,
      ip: item.ip,
      user: item.user,
      pass: item.pass,
      auth: item.auth
    });
    return this.formGroup;
  }

  addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    const newInstance = new Instance();
    this.formGroup = this.createFormGroup(newInstance);

    sender.addRow(this.formGroup);
  }

  editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  changeHandler(value: any, field: string) {
    let tmpFormValue = this.formGroup.value;
    tmpFormValue[field] = value;
    this.formGroup.setValue(tmpFormValue);
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.items.push(formGroup.value);
      // this.instanceService.addInstance(formGroup.value);
    } else {
      this.items[rowIndex] = formGroup.value;
      // this.instanceService.updateInstance(formGroup.value);
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  cancelHandler({ sender, rowIndex }: CancelEvent): void {
    this.closeEditor(sender, rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    // this.instanceService.removeUser(dataItem.id);
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
