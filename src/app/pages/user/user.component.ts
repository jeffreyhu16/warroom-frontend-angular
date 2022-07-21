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
  formGroup?: FormGroup;
  editedRowIndex?: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.userService.getUserGridData().subscribe(res => {
      this.items = res;
      this.gridData = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
      }
    });
    this.roleService.getAllRoles().subscribe(res => {
      this.listItems = res;
    });
  }

  createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new User() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      user_name: item.user_name,
      roles: item.roles
    });
    return this.formGroup;
  }
}

function createFormGroup(dataItem: any): FormGroup {
  return new FormGroup({
    user_name: new FormControl(dataItem.user_name),
    roles: new FormControl(dataItem.roles)
  });
}

// addHandler({ sender }: AddEvent): void {
  //   this.closeEditor(sender);

  //   this.formGroup = createFormGroup({
  //     user_name: "",
  //     roles: []
  //   });
  //   sender.addRow(this.formGroup);
  // }

  // editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
  //   this.closeEditor(sender);

  //   this.formGroup = createFormGroup(dataItem);
  //   this.editedRowIndex = rowIndex;
  //   sender.editRow(rowIndex, this.formGroup);
  // }

  // saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
  //   if (isNew) {
  //     formGroup.value.id = this.items.length;
  //     this.items.push(formGroup.value);
  //     this.loadItems();
  //   } else {
  //     for (let key in formGroup.value) {
  //       this.items[rowIndex][key] = formGroup.value[key];
  //     }
  //   }
  //   sender.closeRow(rowIndex);
  //   // this.userService.emitChange(this.items);
  //   console.log('saveHandler: ', this.items);
  // }

  // cancelHandler({ sender, rowIndex }: CancelEvent): void {
  //   this.closeEditor(sender, rowIndex);
  // }

  // removeHandler({ dataItem }: RemoveEvent): void {
  //   console.log(dataItem);
  // }

  // private closeEditor(
  //   grid: GridComponent,
  //   rowIndex = this.editedRowIndex
  // ): void {
  //   grid.closeRow(rowIndex);
  //   this.editedRowIndex = undefined;
  //   this.formGroup = undefined;
  // }