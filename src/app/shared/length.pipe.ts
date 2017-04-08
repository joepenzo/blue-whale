import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'length'})
export class LengthPipe implements PipeTransform {
    transform(value: number): any {
        return (value / 1000 / 1000).toFixed(2) + " MB";
    }
}