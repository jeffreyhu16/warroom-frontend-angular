import { Component, Input, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControlOptions } from "@angular/forms";
import { Dashboard } from 'src/app/model/dashboard-data';
import { MenuService } from 'src/app/services/menu.service';
import {
  AddEvent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  GridComponent
} from "@progress/kendo-angular-grid";
import { DashboardService } from 'src/app/services/dashboard.service';
import { InstanceService } from 'src/app/services/instance.service';
import { RoleService } from 'src/app/services/role.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() public items!: any[];
  @Input() public menuId!: number;
  @Input() public roleId!: number;
  @Input() public menuItems!: any[];
  @Input() public menuMode!: boolean;

  addMode: boolean = false;
  instanceItems!: any[];
  dashboardItems!: any[];
  gridData!: GridDataResult;
  pageSize: number = 10;
  skip: number = 0;
  formGroup!: FormGroup;
  editedRowIndex!: number;
  prevUneditedRow!: any;
  width!: string;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private menuService: MenuService,
    private instanceService: InstanceService,
  ) { }

  async ngOnInit() {
    this.width = this.menuMode ? "25%" : "20%";
    if (!this.menuMode) {
      this.menuItems = await lastValueFrom(this.menuService.getMenus());
    }
    console.log('menuService:', this.menuItems)
    this.instanceItems = await lastValueFrom(this.instanceService.getInstances());
    console.log('getInstances:', this.instanceItems);
    if (this.items) {
      this.loadItems();
    } else {
      this.items = [];
    }
    console.log('dashboards under menu:', this.items)
    console.log('gridData:', this.gridData)
  }

  loadItems(): void {
    this.gridData = {
      data: this.items.slice(this.skip, this.skip + this.pageSize),
      total: this.items.length
    }
  }

  updateDashboardList(id: number) {
    if (this.menuMode) {
      this.instanceService.getDashboards(id).subscribe(res => {
        this.dashboardItems = res
      });
    } else {
      this.dashboardItems = this.getMenu(id).dashboards;
    }
  }

  getInstance(id: number): any {
    console.log('getInstanceName id:', id)
    const instance = this.instanceItems.filter(item => item.instance_id === id);
    console.log('instance:', instance)
    return instance[0];
  }

  getMenu(id: number): any {
    return this.menuItems.filter(item => item.menu_id === id)[0];
  }

  getDashboardById(id: number): any {
    return this.dashboardItems.filter(item => item.dashboard_id === id)[0];
  }

  getDashboardByUid(uid: string): any {
    return this.dashboardItems.filter(item => item.uid === uid)[0];
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  createFormGroup(dataItem: any): FormGroup {
    const item = dataItem;

    this.formGroup = this.formBuilder.group({
      uid: item.uid,
      old_dashboard_id: 0,
      new_dashboard_id: 0,
      dashboard_id: item.dashboard_id,
      dashboard_name: item.dashboard_name,
      description: item.description,
      instance_id: item.instance_id,
      instance_name: item.instance_name,
      menu_id: item.menu_id,
      menu_name: item.menu_name
    });
    this.formGroup.get('dashboard_name')!.setValidators(Validators.required);
    return this.formGroup;
  }

  addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);
    this.addMode = true;

    const newDash = new Dashboard();
    this.formGroup = this.createFormGroup(newDash);

    sender.addRow(this.formGroup);
  }

  editHandler({ sender, rowIndex, dataItem }: EditEvent): void {
    this.closeEditor(sender);

    this.formGroup = this.createFormGroup(dataItem);
    this.prevUneditedRow = { ...dataItem };
    this.editedRowIndex = rowIndex;

    const id = this.menuMode ? dataItem.instance_id : dataItem.menu_id;
    this.updateDashboardList(id);
    sender.editRow(rowIndex, this.formGroup);
  }

  changeHandler(value: any, field: string, isNew?: boolean) {
    let tmpFormValue = this.formGroup.value;
    const gridDataRow = this.gridData.data[this.editedRowIndex];
    switch (field) {
      case "instance_id":
        this.updateDashboardList(value);
        if (!isNew) {
          console.log('changeHandler gridData:', this.gridData.data);
          console.log('changeHandler editIndex:', this.editedRowIndex);
          gridDataRow.dashboard_id = 0;
          gridDataRow.description = '';
        }
        const instanceName = this.getInstance(value).name;
        tmpFormValue.instance_name = instanceName;
        break;
      case "menu_id": // add menu_id & menu_name when editing role page
        this.updateDashboardList(value);
        const menu = this.getMenu(value);
        tmpFormValue.menu_name = menu.menu_name;
        if (!isNew) {
          gridDataRow.dashboard_id = menu.dashboards[0].dashboard_id;
          gridDataRow.instance_name = '';
          gridDataRow.description = '';
        } 
        break;
      case "uid":
        const dashboardName = this.getDashboardByUid(value).dashboard_name;
        tmpFormValue.dashboard_name = dashboardName;
        break;
      case "dashboard_id":
        const dashboard = this.getDashboardById(value);
        console.log('dashboard:', dashboard)
        if (isNew) {
          tmpFormValue.uid = dashboard.uid;
          tmpFormValue.instance_name = dashboard.instance_name;
          tmpFormValue.description = dashboard.description;
        } else {
          tmpFormValue.old_dashboard_id = tmpFormValue.dashboard_id;
          tmpFormValue.new_dashboard_id = value;
          gridDataRow.instance_name = dashboard.instance_name;
          gridDataRow.description = dashboard.description;
        } // ^default dashboard set after changing menu name may not fill instance/desc after
        tmpFormValue.dashboard_name = dashboard.dashboard_name;
        break;
    }
    tmpFormValue[field] = value;
    console.log('tmpFormValue:', tmpFormValue);
    this.formGroup.setValue(tmpFormValue);
  }

  saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent) {
    const id = this.menuMode ? this.menuId : this.roleId;
    let form;
    if (isNew) {
      this.items.push(formGroup.value);
      if (this.menuMode) {
        const { uid, dashboard_name, description, instance_id, instance_name } = formGroup.value;
        const form = { uid, dashboard_name, description, instance_id, instance_name }
        this.menuService.addDashboard(id, form).subscribe(res => {
          console.log('Add Dashboard res:', res);
        });
      } else {
        this.roleService.addDashboard(id, formGroup.value.dashboard_id).subscribe(res => {
          console.log('Add Dashboard res:', res);
        });
      }
      this.addMode = false;
    } else {
      this.items[rowIndex] = formGroup.value;
      if (this.menuMode) {
        const { uid, dashboard_id, dashboard_name, description, instance_id, instance_name } = formGroup.value;
        form = { uid, dashboard_id, dashboard_name, description, instance_id, instance_name }
        console.log('form:', form);
      } else {
        const { old_dashboard_id, new_dashboard_id } = formGroup.value;
        form = { old_dashboard_id, new_dashboard_id }
        this.roleService.updateDashboard(id, form).subscribe(res => {
          console.log('Update Dashboard res:', res);
        });
      }
    }
    this.loadItems();
    sender.closeRow(rowIndex);
  }

  removeHandler({ dataItem, rowIndex }: RemoveEvent): void {
    this.items.splice(rowIndex, 1);
    this.loadItems();
    const service = this.menuMode ? "menuService" : "roleService";
    const id = this.menuMode ? this.menuId : this.roleId;
    this[service].removeDashboard(id, dataItem.dashboard_id).subscribe(res => {
      console.log(`Delete Dashboard from ${service}:`, res);
    });
  }

  cancelHandler({ sender, rowIndex, isNew }: CancelEvent): void {
    if (isNew) {
      this.addMode = false;
    } else {
      this.gridData.data[this.editedRowIndex!] = this.prevUneditedRow;
    }
    console.log('prevUneditedRow:', this.prevUneditedRow)
    this.closeEditor(sender, rowIndex);
  }

  closeEditor(
    grid: GridComponent,
    rowIndex = this.editedRowIndex
  ): void {
    grid.closeRow(rowIndex);
  }
}
