import { Pipe, PipeTransform } from '@angular/core';
import { getStatNameDisplayName } from '../models/statName.enum';
import { getStatNameAbbreviation } from '../models/statName.enum';

@Pipe({
    name: 'statNameDisplay'
})
export class StatNameDisplayPipe implements PipeTransform {
    transform(value: any, type: 'abbrev' | 'full' = 'full'): string {
        if (type === 'abbrev') {
            return getStatNameAbbreviation(value);
        } else {
            return getStatNameDisplayName(value);
        }
    }
}
