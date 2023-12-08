import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./auth/auth.guard";



const routes: Routes = [
  { path: 'admin',canActivateChild: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule) },
  { path: '', loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule) },
  { path: "auth/login", loadChildren: () => import("./auth/auth.module").then(module => module.AuthModule)},
  { path: "**", redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]  
})
export class AppRoutingModule { }
