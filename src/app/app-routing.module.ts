import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryComponent } from './history/history.component';
import { NewRouteComponent } from './new-route/new-route.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './_service/auth-guard.service';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registartion', component: RegistrationComponent },
    { path: '', component: MainPageComponent, canActivate: [AuthGuard], children: [
        {path: 'welcome', component: WelcomeComponent},
        {path: 'history', component: HistoryComponent},
        {path: 'new-route', component: NewRouteComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }