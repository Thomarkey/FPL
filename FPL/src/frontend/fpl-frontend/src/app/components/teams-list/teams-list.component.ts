import { Component } from '@angular/core';
import { Team, getTeamDisplayName } from 'src/app/models/team.enum';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent {

  teams: Team[] = Object.values(Team);
  getTeamDisplayName = getTeamDisplayName;
  showLinksForTeam: string | null = null;


  constructor() { }

  toggleRowDetail(team: string) {
    if (this.showLinksForTeam === team) {
      this.showLinksForTeam = null;
    } else {
      this.showLinksForTeam = team;
    }
  }

}
