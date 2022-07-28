import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InstanceComponent } from './pages/instance/instance.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RoleComponent } from './pages/role/role.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: "home", component: HomeComponent, },
  { path: "setting/user", component: UserComponent, },
  { path: "setting/role", component: RoleComponent, },
  { path: "setting/instance", component: InstanceComponent, },
  { path: "setting/menu", component: MenuComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
