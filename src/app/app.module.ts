import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { AuthenticationService } from './_service/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryComponent } from './history/history.component';
import { NewRouteComponent } from './new-route/new-route.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TokenInterceptorService } from './_service/token-interceptor.service';
import { UserService } from './_service/user.service';
import { AuthGuard } from './_service/auth-guard.service';
import { RouteComponent } from './route/route.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteService } from './_service/route.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainPageComponent,
    HistoryComponent,
    NewRouteComponent,
    WelcomeComponent,
    RouteComponent,
    FavoritesComponent,
    ProfileComponent,
    RouteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    RouteService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
