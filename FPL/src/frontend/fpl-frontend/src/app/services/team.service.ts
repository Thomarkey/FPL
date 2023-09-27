import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Team } from '../models/team.enum';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  private selectedTeamSubject = new BehaviorSubject<Team | null>(null);

  setSelectedTeam(team: Team | null): void {
    this.selectedTeamSubject.next(team);
  }

  getSelectedTeam(): Observable<Team | null> {
    return this.selectedTeamSubject.asObservable();
  }

}
