import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlayerListComponent } from '../player-list/player-list.component';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private teamservice: TeamService) { };

  resetSelectedTeam(): void {
    this.teamservice.setSelectedTeam(null);
  }
}
