import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './modules/home/home.component';
import {AlinaComponent} from './modules/sidenav/alina/alina.component';
import {ActivationComponent} from './static/activation/activation.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'navigation',
    redirectTo: '/dashboard'
  },
  {
    path: 'alina',
    component: AlinaComponent
  },
  {
    path: 'activate',
    component: ActivationComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
