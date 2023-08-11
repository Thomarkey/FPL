import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.sass']
})
export class PlayerListComponent {

  players: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {
      this.players = data;
    });
  };
}



