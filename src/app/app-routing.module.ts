import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductsComponent } from './user/products/products.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, children: [
    { path: 'electronics', component: ProductsComponent, canActivate: [AuthGuard], data: { category: 'electronics' }},
    { path: 'jewelery', component: ProductsComponent, canActivate: [AuthGuard], data: { category: 'jewelery' }},
    { path: "men's clothing", component: ProductsComponent, canActivate: [AuthGuard], data: { category: "men\'s clothing" }},
    { path: "women's clothing", component: ProductsComponent, canActivate: [AuthGuard], data: { category: "women\'s clothing" }},
    { path: "product/:id", component: ProductDetailComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: 'electronics', pathMatch: 'full', data: { category: 'electronics' }}
  ] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
