import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { MatTableModule } from '@angular/material/table';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import {MatIconModule} from '@angular/material/icon';
import { ProductImagesDialogComponent } from './product-images-dialog/product-images-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent, 
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ProductImagesDialogComponent,
    ProductViewDetailsComponent,
    BuyProductComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ], 
    providers: [
      AuthGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      UserService,
      provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
