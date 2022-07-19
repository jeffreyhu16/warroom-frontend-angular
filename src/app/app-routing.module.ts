import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataViewComponent } from './pages/data-view/data-view.component';
import { InstanceComponent } from './pages/instance/instance.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, },
  { path: "user", component: UserComponent, },
  { path: "instance", component: InstanceComponent, },
  { path: "data_view", component: DataViewComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
