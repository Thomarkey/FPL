import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { StatName } from 'src/app/models/statName.enum';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

  players: Player[] = [];
  selectedPlayer: Player | null = null;
  selectedStats: Set<StatName> = new Set(); // Initialize selectedStats Set
  preSelectedStats: StatName[] = [StatName.GAME_STARTED]; // Add more if needed
  isDropdownOpen: boolean = false;

  @ViewChild('dropdown', { read: ElementRef }) dropdownRef!: ElementRef;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.isDropdownOpen) {
      const isClickedInside = this.dropdownRef.nativeElement.contains(event.target);
      if (!isClickedInside) {
        this.isDropdownOpen = false;
      }
    }
  }


  toggleStat(stat: StatName): void {
    if (this.selectedStats.has(stat)) {
      this.selectedStats.delete(stat);
    } else {
      this.selectedStats.add(stat);
    }
  }

  //PAGINATION
  currentPage: number = 1;
  playersPerPage: number = 10;
  totalPages: number = this.getTotalPages();

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {
      this.players = data;
      // Initialize selectedStats with pre-selected stats
      this.preSelectedStats.forEach(stat => this.selectedStats.add(stat));
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
