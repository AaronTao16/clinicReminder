import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../service/patient/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../service/login/login.service';
import {Patient} from '../../entity/patient';
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../entity/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  patOrds: Patient[] | undefined;
  curDocId = 0;

  constructor(private patientService: PatientService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.listOrders();
    });
  }

  listOrders(): void{
    this.curDocId = JSON.parse(sessionStorage.d).id;
    console.log(this.curDocId === null);

    console.log(this.curDocId);

    this.patientService.getPatients(this.curDocId).subscribe(
      // data => {
      //   console.log(data);
      // }
      data => this.patOrds = data
    );
  }

  logOut(): void{
    this.loginService.logOut();
  }


  check($event: MouseEvent, patOrd: Patient): void {
      this.router.navigate(['clinicsystem/order/check'], {queryParams: {id: patOrd.patId, name: patOrd.fName + ' ' + patOrd.lName}});
  }
}
