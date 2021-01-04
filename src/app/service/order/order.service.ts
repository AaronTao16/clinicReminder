import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Doctor} from '../../entity/doctor';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../entity/order';
import {Patient} from '../../entity/patient';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  // patId: string, ordTitle: string, pro: number, sTime: Date, eTime: Date | undefined, des: string,
  //       docId: string | null
  // {patId, ordTitle, pro, sTime, eTime, des, docId}
  add(order: { doctor: { docId: string | null }; des: string; eTime: Date; patient: { patId: string }; ordTitle: string;
  sTime: Date; pro: number }): Observable<boolean>{
    const url = 'http://localhost:8080/order/newOrder';
    console.log(order.sTime);
    return this.httpClient.post<boolean>(url, order);
  }

  getDocId(){
    const user = JSON.parse(sessionStorage.d);
    console.log(user.id);
    return user.id;
  }

  getPatOrders(patId: number): Observable<Order[]>{
    const searchUrl = 'http://localhost:8080/order/' + patId;
    console.log(searchUrl);
    return this.httpClient.get<Order[]>(searchUrl);
  }

  getHisOrders(patId: number): Observable<any>{
    const searchUrl = 'http://localhost:8080/order/barchart/' + patId;
    console.log(this.httpClient.get<any>(searchUrl));
    console.log(this.httpClient.get<object[]>(searchUrl));
    return this.httpClient.get<any>(searchUrl);
  }
}

interface GetResponseData{
  _embedded: {
    orders: Order[];
  };
}
