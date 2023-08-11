import { Pipe, PipeTransform } from '@angular/core';
import { getPositionDisplayName } from '../models/position.enum';

@Pipe({
    name: 'positionDisplay'
})
export class PositionDisplayPipe implements PipeTransform {
    transform(value: any): string {
        return getPositionDisplayName(value);
    }
}
