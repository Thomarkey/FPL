import { Pipe, PipeTransform } from '@angular/core';
import { getStatNameDisplayName } from '../models/statName.enum';

@Pipe({
    name: 'statNameDisplay'
})
export class StatNameDisplayPipe implements PipeTransform {
    transform(value: any): string {
        return getStatNameDisplayName(value);
    }
}
