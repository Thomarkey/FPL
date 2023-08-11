import { Pipe, PipeTransform } from '@angular/core';
import { getTeamDisplayName } from '../models/team.enum';

@Pipe({
    name: 'teamDisplay'
})
export class TeamDisplayPipe implements PipeTransform {
    transform(value: any): string {
        return getTeamDisplayName(value);
    }
}
