import { AppComponent } from './app.component';
import { InstanceComponent } from './pages/instance/instance.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoleComponent } from './pages/role/role.component';
import { UserComponent } from './pages/user/user.component';

import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BimapAppLayoutModule } from 'bimap-app-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoleComponent,
    InstanceComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BimapAppLayoutModule.forRoot({
      ssoDomain: environment.ssoAPIDomain,
      ssoEnable: environment.ssoEnable,
      title: environment.title,
      version: environment.version
    }),
    MenuModule,
    BrowserAnimationsModule,
    ButtonsModule,
    IconsModule,
    NotificationModule,
    ProgressBarModule,
    LayoutModule,
    DropDownsModule,
    GridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
