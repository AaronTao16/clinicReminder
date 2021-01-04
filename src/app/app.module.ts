import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {DoctorComponent} from './components/doctor/doctor.component';
import {DoctorService} from './service/doctor/doctor.service';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthGuardService} from './service/auth-guard/auth-guard.service';
import { PatientComponent } from './components/patient/patient.component';
import {LoginService} from './service/login/login.service';
import { ClinicsystemComponent } from './components/clinicsystem/clinicsystem.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { OrderComponent } from './components/order/order.component';
import { NewOrdComponent } from './components/new-ord/new-ord.component';
import {DlDateTimeDateModule, DlDateTimeInputModule, DlDateTimePickerModule} from 'angular-bootstrap-datetimepicker';
import { CheckOrderComponent } from './components/check-order/check-order.component';
import {CheckOrderPipePipe} from './components/check-order/check-order.pipe';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    HomeComponent,
    Page404Component,
    LoginComponent,
    PatientComponent,
    ClinicsystemComponent,
    OrderComponent,
    NewOrdComponent,
    CheckOrderComponent,
    CheckOrderPipePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    DlDateTimeInputModule,
    ChartsModule
  ],
  providers: [
    DoctorService,
    LoginService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
