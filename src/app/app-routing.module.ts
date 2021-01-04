import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ClinicsystemComponent} from './components/clinicsystem/clinicsystem.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuardService} from './service/auth-guard/auth-guard.service';
import {DoctorComponent} from './components/doctor/doctor.component';
import {PatientComponent} from './components/patient/patient.component';
import {Page404Component} from './components/page404/page404.component';
import {OrderComponent} from './components/order/order.component';
import {NewOrdComponent} from './components/new-ord/new-ord.component';
import {CheckOrderComponent} from './components/check-order/check-order.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'clinicsystem', component: ClinicsystemComponent, children: [
      {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
      // {path: 'doctor', component: DoctorComponent},
      // {path: 'doctor/:username', component: DoctorComponent},
      {path: 'patient', component: PatientComponent, canActivate: [AuthGuardService]},
      {path: 'order', component: OrderComponent, canActivate: [AuthGuardService]},
      {path: 'order/check', component: CheckOrderComponent, canActivate: [AuthGuardService]},
      {path: 'patient/newOrder', component: NewOrdComponent, canActivate: [AuthGuardService]},
      {path: '**', component: Page404Component}
    ]},
  {path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuardService]},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
