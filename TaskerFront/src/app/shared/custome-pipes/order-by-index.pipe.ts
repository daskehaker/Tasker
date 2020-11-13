import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByIndex'
})
export class OrderByIndexPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
