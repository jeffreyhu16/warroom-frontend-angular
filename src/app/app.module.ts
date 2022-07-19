import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BimapAppLayoutModule } from 'bimap-app-layout';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from '@progress/kendo-angular-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { IconsModule } from '@progress/kendo-angular-icons';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './pages/user/user.component';
import { InstanceComponent } from './pages/instance/instance.component';
import { DataViewComponent } from './pages/data-view/data-view.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    InstanceComponent,
    DataViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
