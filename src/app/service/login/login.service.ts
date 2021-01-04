import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {Doctor} from '../../entity/doctor';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {
  }

  private baseUrl = 'http://localhost:8080/doctor';

  login(userName: string, password: string): Observable<Doctor>{
    const url = 'http://localhost:8080/doctor/login';
    console.log(userName);
    return this.httpClient.post<Doctor>(url, {userName, password});
  }


  authenticate(doc: Doctor): void{
      const d = {id: doc.docId, username: doc.userName};
      sessionStorage.d = JSON.stringify(d);
      // sessionStorage.setItem('id', String(doc.docId));
      // sessionStorage.setItem('username', String(doc.userName));
  }

  isLoggedIn(): boolean{
    // const user = sessionStorage.getItem(('username'));
    const user = JSON.parse(sessionStorage.d);
    console.log(user === null);
    return !(user === null);
  }


  logOut(): void{
    sessionStorage.removeItem('d');
  }


}
