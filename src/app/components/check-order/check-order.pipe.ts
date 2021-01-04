import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'priority'
})
export class CheckOrderPipePipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1) {
      return 'High';
    } else if (value === 2) {
      return 'Middle';
    } else {
      return 'Low';
    }
  }
}
