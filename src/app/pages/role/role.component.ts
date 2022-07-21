import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/model/role-data';

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

  constructor(private roleService: RoleService, private formBuilder: FormBuilder) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.roleService.getRoleGridData().subscribe(res => {
      this.items = res;
      this.gridData = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
      }
    })
  }

  createFormGroup(args: any): FormGroup {
    const item = args.isNew ? new Role() : args.dataItem;

    this.formGroup = this.formBuilder.group({
      role: item.role,
      dashboards: item.dashboards
    });
    return this.formGroup;
  }
}
