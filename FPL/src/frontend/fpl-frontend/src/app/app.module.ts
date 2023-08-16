import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamDisplayPipe } from './pipes/team-display.pipe';
import { PositionDisplayPipe } from './pipes/position-display.pipe';
import { StatNameDisplayPipe } from './pipes/statName-display.pipe';
import { FormsModule } from '@angular/forms';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerDetailPopupComponent } from './components/player-detail-popup/player-detail-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    PositionDisplayPipe,
    StatNameDisplayPipe,
    TeamDisplayPipe,
    PlayerDetailPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
