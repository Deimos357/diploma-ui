import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistoryComponent } from './history/history.component';
import { NewRouteComponent } from './new-route/new-route.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './_service/auth-guard.service';
import { RouteComponent } from './route/route.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { EditRouteComponent } from './edit-route/edit-route.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registartion', component: RegistrationComponent },
    { path: '', component: MainPageComponent, canActivate: [AuthGuard], children: [
        {path: 'welcome', component: WelcomeComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'history', component: HistoryComponent},
        {path: 'favorites', component: FavoritesComponent},
        {path: 'new-route', component: NewRouteComponent},
        {path: 'route/:id', component: RouteComponent},
        {path: 'route/:id/edit', component: EditRouteComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }