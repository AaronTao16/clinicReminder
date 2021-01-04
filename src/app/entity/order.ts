import {Doctor} from './doctor';
import {Patient} from './patient';

export class Order {
  ordId: number;
  ordTitle: string;
  cTime: Date;
  sTime: Date;
  eTime: Date;
  fTime: Date;
  des: string;
  pro: number;
  status: number;
  duration: bigint;
  doctor: Doctor;
  patient: Patient;


  constructor(ordId: number, ordTitle: string, cTime: Date, sTime: Date, eTime: Date, des: string, pro: number, status: number,
              duration: bigint, doctor: Doctor, patient: Patient, fTime: Date) {
    this.ordId = ordId;
    this.ordTitle = ordTitle;
    this.cTime = cTime;
    this.sTime = sTime;
    this.eTime = eTime;
    this.des = des;
    this.pro = pro;
    this.status = status;
    this.duration = duration;
    this.doctor = doctor;
    this.patient = patient;
    this.fTime = fTime;
  }
}
