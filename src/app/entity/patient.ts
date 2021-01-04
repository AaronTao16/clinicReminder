export class Patient {
  patId: number;
  fName: string;
  lName: string;
  age: number;
  dept: string;
  phone: number;
  email: string;
  hCount: number;
  mCount: number;
  lCount: number;


  // tslint:disable-next-line:max-line-length
  constructor(patId: number, fName: string, lName: string, age: number, dept: string, phone: number, email: string, hCount: number, mCount: number, lCount: number) {
    this.patId = patId;
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.dept = dept;
    this.phone = phone;
    this.email = email;
    this.hCount = hCount;
    this.mCount = mCount;
    this.lCount = lCount;
  }
}
