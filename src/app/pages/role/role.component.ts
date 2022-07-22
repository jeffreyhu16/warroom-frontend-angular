import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/model/role-data';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent
} from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  items!: any[];
  formGroup!: FormGroup;
  editedRowIndex?: number;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.roleService.getRoleGridData().subscribe(res => {
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

  createFormGroup(dataItem: any): FormGroup { 
    // create dropdowns of available dashboards after choosing instance 
    // add to existing menu or create new one
    const item = dataItem;

    this.formGroup = this.formBuilder.group({
      id: item.id,
      name: item.name,
      dashboards: [item.dashboards]
    });
    return this.formGroup;
  }

  addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    const newRole = new Role();
    this.formGroup = this.createFormGroup(newRole);

    sender.addRow(this.formGroup);
  }

  editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.items.push(formGroup.value);
      // this.roleService.addRole(formGroup.value);
    } else {
      this.items[rowIndex] = formGroup.value;
      // this.roleService.updateRole(formGroup.value);
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    // this.roleService.removeRole(dataItem.id);
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
