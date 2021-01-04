import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClinicsystemComponent} from '../clinicsystem/clinicsystem.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ClinicsystemComponent implements OnInit {

  ngOnInit(): void {
  }


}
