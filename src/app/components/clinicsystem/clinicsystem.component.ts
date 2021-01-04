import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-clinicsystem',
  templateUrl: './clinicsystem.component.html',
  styleUrls: ['./clinicsystem.component.css']
})
export class ClinicsystemComponent implements OnInit {

  id: string | null | undefined;

  constructor(private loginService: LoginService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getId();
  }

  logOut(): void{
    this.loginService.logOut();
    this.router.navigate(['login']);
  }

  getId(){
    const user = JSON.parse(sessionStorage.d);
    console.log(user.id);
    this.id = user.id;
    console.log(this.id === null);
    return !(this.id === null);
  }
}
