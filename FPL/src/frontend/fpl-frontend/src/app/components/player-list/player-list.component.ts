import { Component } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { getPositionDisplayName } from 'src/app/models/position.enum';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

  players: Player[] = [];
  selectedPlayer: Player | null = null;
  currentPage: number = 1;
  playersPerPage: number = 10;
  totalPages: number = this.getTotalPages();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {
      this.players = data;
    });
  };

  showPlayerDetails(player: Player): void {
    this.selectedPlayer = player; // Set the selected player
  }


  //PAGINATION
  getVisiblePageNumbers(): number[] {
    const visiblePages: number[] = [];
    const totalPages = Math.ceil(this.players.length / this.playersPerPage);

    if (totalPages <= 7) {
      for (let i = 2; i < totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (this.currentPage < 5) {
        for (let i = 2; i <= 5; i++) {
          visiblePages.push(i);
        }
      } else if (this.currentPage > totalPages - 4) {
        for (let i = totalPages - 4; i < totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          visiblePages.push(i);
        }
      }
    }

    return visiblePages;
  }

  getTotalPages(): number {
    return Math.ceil(this.players.length / this.playersPerPage);
  }


}