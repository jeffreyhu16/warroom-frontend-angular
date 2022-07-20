import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanceComponent } from './pages/instance/instance.component';
import { RoleComponent } from './pages/role/role.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: "user", component: UserComponent, },
  { path: "role", component: RoleComponent, },
  { path: "instance", component: InstanceComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
