import {Order} from './order';

export class OrderSta {
  ordStaId: number;
  order: Order;
  finishedTime: Date;
  curSta: string;


  constructor(ordStaId: number, order: Order, finishedTime: Date, curSta: string) {
    this.ordStaId = ordStaId;
    this.order = order;
    this.finishedTime = finishedTime;
    this.curSta = curSta;
  }
}
