import { Pipe, PipeTransform } from '@angular/core';
import { TimeInterval } from 'src/app/interfaces/timeInterval';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string | Date {
    if(value) {
      const differenceInSeconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if(differenceInSeconds < 30) return 'Just now';

      const timeIntervals: TimeInterval = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
      };

      let counter: number;
      for(const i in timeIntervals) {
        counter = Math.floor(differenceInSeconds / timeIntervals[i]);

        if(counter > 0) {
          if (counter === 1) return `${counter} ${i} ago`;
          else return `${counter} ${i}s ago`; 
        }
      }

    }
    return value;
  }
}