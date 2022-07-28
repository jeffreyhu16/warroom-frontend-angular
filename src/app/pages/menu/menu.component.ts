import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/app/model/menu-data';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent
} from "@progress/kendo-angular-grid";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  items!: any[];
  formGroup!: FormGroup;
  editedRowIndex?: number;
  initialInstanceId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(res => {
      console.log(res)
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
      menu_id: item.menu_id,
      menu_name: item.menu_name,
      dashboards: [item.dashboards]
    });
    this.formGroup.get('menu_name')!.setValidators(Validators.required);
    return this.formGroup;
  }

  addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    const newMenu = new Menu();
    this.formGroup = this.createFormGroup(newMenu);

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
      this.menuService.addMenu(formGroup.value).subscribe(res => {
        console.log('Add Menu:', res);
      });
    } else {
      this.items[rowIndex] = formGroup.value;
      this.menuService.updateMenu(formGroup.value.menu_id, formGroup.value).subscribe(res => {
        console.log('Update Menu:', res);
      });
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    this.menuService.removeMenu(dataItem.menu_id).subscribe(res => {
      console.log('Delete Menu:', res);
    });
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
