import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Doctor} from '../../entity/doctor';
import {map} from 'rxjs/operators';
import {Patient} from '../../entity/patient';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients/search';
  constructor(private httpClient: HttpClient) { }

  getAllPatients(docId: number): Observable<Patient[]>{
    const searchUrl = this.baseUrl + '/patients?docId=' + docId;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseData>(searchUrl).pipe(
      map(response => response._embedded.patients)
    );
  }

  getPatients(docId: number): Observable<Patient[]>{
    const searchUrl = 'http://localhost:8080/patient/' + docId;
    console.log(searchUrl);
    console.log(this.httpClient.get<Patient[]>(searchUrl));
    return this.httpClient.get<Patient[]>(searchUrl);
  }
}

interface GetResponseData{
  _embedded: {
    patients: Patient[];
  };
}
