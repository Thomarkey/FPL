import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { FixturesComponent } from './components/fixtures/fixtures.component';

const routes: Routes = [
  { path: 'players', component: PlayerListComponent },
  { path: 'teams', component: TeamsListComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'fixtures', component: FixturesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
