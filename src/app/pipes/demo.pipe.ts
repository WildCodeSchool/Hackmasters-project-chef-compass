/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo',
})
export class DemoPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
