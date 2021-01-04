import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../entity/patient';
import {PatientService} from '../../service/patient/patient.service';

@Component({
  selector: 'app-home-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit{

  pats: Patient[] | undefined;
  curDocId = 0;
  isChecked = false;

  constructor(private patientService: PatientService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listPats();
    });
  }

  listPats(): any{
    this.curDocId = JSON.parse(sessionStorage.d).id;
    console.log(this.curDocId === null);

    console.log(this.curDocId);

    this.patientService.getAllPatients(this.curDocId).subscribe(
      // data => {
      //   console.log(data);
      // }
      data => this.pats = data
    );
  }

  logOut(): void{
    this.loginService.logOut();
  }


  newOrder($event: Event, patient: Patient): any{
    this.router.navigate(['clinicsystem/patient/newOrder'], {queryParams: {id: patient.patId, name: patient.fName + ' ' + patient.lName}});
  }
}
