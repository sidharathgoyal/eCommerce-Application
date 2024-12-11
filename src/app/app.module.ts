import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { UserService } from './_services/user.service';
import { AuthInterceptor } from './_auth/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent, AdminComponent, ForbiddenComponent,
        HomeComponent, LoginComponent, UserComponent
    ],
    imports: [BrowserModule, ReactiveFormsModule, HttpClient, RouterModule],
    providers:[
      //  provideHttpClient(withInterceptors([AuthInterceptor])),
         AuthGuard, 
         {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
         },
         UserService
    ],
    bootstrap:[AppComponent]
})
export class AppModule { }
