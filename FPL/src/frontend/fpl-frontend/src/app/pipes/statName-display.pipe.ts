import { Pipe, PipeTransform } from '@angular/core';
import { getStatNameCategory, getStatNameDisplayName } from '../models/statName.enum';
import { getStatNameAbbreviation } from '../models/statName.enum';

@Pipe({
    name: 'statNameDisplay'
})
export class StatNameDisplayPipe implements PipeTransform {
    transform(value: any, type: 'abbrev' | 'category' | 'full' = 'full'): string {
        if (type === 'abbrev') {
            return getStatNameAbbreviation(value);
        } if (type === 'category') {
            return getStatNameCategory(value);
        }
        else {
            return getStatNameDisplayName(value);
        }
    }
}
