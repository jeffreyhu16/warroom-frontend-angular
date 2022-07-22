import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { User } from 'src/app/model/user-data';
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent
} from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit { // add dynamic variable for column width during window resize

  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  items!: any[];
  listItems!: string[];
  formGroup!: FormGroup;
  editedRowIndex?: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.userService.getUserGridData().subscribe(res => {
      this.items = res;
    });
    this.roleService.getAllRoles().subscribe(res => {
      this.listItems = res;
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
    const item = dataItem;

    this.formGroup = this.formBuilder.group({
      user_id: item.user_id,
      name: item.name,
      roles: [item.roles]     // why is this the array bracket needed
    });
    return this.formGroup;
  }

  addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    const newUser = new User();
    this.formGroup = this.createFormGroup(newUser);

    sender.addRow(this.formGroup);
  }

  editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.createFormGroup(dataItem);

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  changeHandler(value: any[]) {
    this.formGroup.value.roles = value;
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    if (isNew) {
      this.items.push(formGroup.value);
      // this.userService.addUser(formGroup.value);
    } else {
      this.items[rowIndex] = formGroup.value;
      // this.userService.updateUser(formGroup.value);
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    // this.userService.removeUser(dataItem.id);
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
