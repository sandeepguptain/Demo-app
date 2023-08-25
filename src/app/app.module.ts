import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from './angular-material.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NavebarComponent } from './navebar/navebar.component';
import { ProductsComponent } from './user/products/products.component';
import { LoadingInterceptor } from './core/interceptors/auth.interceptor';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { AddProductComponent } from './admin/add-product/add-product.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    HeaderComponent,
    NavebarComponent,
    ProductsComponent,
    ProductDetailComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    document.documentElement.setAttribute('dir', 'ltr');

    translate.onLangChange.subscribe((event) => {
      document.documentElement.setAttribute('dir', event.lang === 'ar' ? 'rtl' : 'ltr');
    });
  }
 }
