import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/model/instance-data';

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
    this.loadItems();
  }

  loadItems(): void {
    this.instanceService.getInstanceGridData().subscribe(res => {
      this.items = res;
      this.gridData = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
      }
    })
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
}
