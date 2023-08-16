import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { StatName } from 'src/app/models/statName.enum';
import { Team } from 'src/app/models/team.enum';
import { Position } from 'src/app/models/position.enum';


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

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {
      this.players = data;
      // Initialize selectedStats with pre-selected stats
      this.preSelectedStats.forEach(stat => this.selectedStats.add(stat));
      this.filteredPlayers = [...this.players];
    });
  };

  //SORTING OF STAT COLUMNS
  sortDirection: 'asc' | 'desc' = 'asc';
  sortBy: StatName | null = null;

  toggleSort(stat: StatName): void {
    if (this.sortBy === stat) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = stat;
      this.sortDirection = 'desc';
    }
    this.sort();
  }

  //TODO: check sort while searching for player (sort not updated/following on the fly)
  sort(): void {
    if (this.sortBy) {
      this.filteredPlayers.sort((a, b) => {
        const aValue = a.stats[this.sortBy!] || 0;
        const bValue = b.stats[this.sortBy!] || 0;
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
  }

  castToStatName(key: string): StatName {
    return key as StatName;
  }

  //FILTER TEAM AND POSITION

  Positions: Position[] = Object.values(Position); // Initialize the Positions array with enum values
  Teams: Team[] = Object.values(Team); // Initialize the Teams array with enum values

  selectedTeams: Set<Team> = new Set();
  selectedPositions: Set<Position> = new Set();


  isTeamDropdownOpen: boolean = false;
  isPositionDropdownOpen: boolean = false;


  toggleTeamFilter(team: Team): void {
    if (this.selectedTeams.has(team)) {
      this.selectedTeams.delete(team);
    } else {
      this.selectedTeams.add(team);
    }
    this.filterPlayers();
  }

  togglePositionFilter(position: Position): void {
    if (this.selectedPositions.has(position)) {
      this.selectedPositions.delete(position);
    } else {
      this.selectedPositions.add(position);
    }
    this.filterPlayers();
  }

  toggleTeamDropdown(): void {
    this.isTeamDropdownOpen = !this.isTeamDropdownOpen;

  }

  togglePositionDropdown(): void {
    this.isPositionDropdownOpen = !this.isPositionDropdownOpen;
  }



  filterPlayers(): void {
    this.currentPage = 1;
    this.filteredPlayers = this.players.filter(player =>
      this.selectedTeams.size === 0 || this.selectedTeams.has(player.team)
    ).filter(player =>
      this.selectedPositions.size === 0 || this.selectedPositions.has(player.position)
    );
    this.sort();
  }



  //SEARCH FCTION
  searchQuery: string = '';
  filteredPlayers: Player[] = [];

  //TODO: fix this only clearing name search and not other filters as well (position and teams filter resest but still shows in dropdown as activated)
  clearSearch(): void {
    this.searchQuery = '';
    this.performSearch();
  }

  performSearch(): void {
    this.currentPage = 1;
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    this.filteredPlayers = this.players.filter(player =>
      player.name.toLowerCase().includes(lowerCaseQuery)
    );
  }

  //FILTER DROPDOWN
  isStatsDropdownOpen: boolean = false;
  @ViewChild('statsDropdown', { read: ElementRef }) statsDropdownRef!: ElementRef;
  @ViewChild('teamDropdown', { read: ElementRef }) teamDropdownRef!: ElementRef;
  @ViewChild('positionDropdown', { read: ElementRef }) positionDropdownRef!: ElementRef;

  toggleStatsDropdown(): void {
    this.isStatsDropdownOpen = !this.isStatsDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      this.isStatsDropdownOpen &&
      !this.statsDropdownRef.nativeElement.contains(event.target)
    ) {
      this.isStatsDropdownOpen = false;
    }
    if (
      this.isTeamDropdownOpen &&
      !this.teamDropdownRef.nativeElement.contains(event.target)
    ) {
      this.isTeamDropdownOpen = false;
    }
    if (
      this.isPositionDropdownOpen &&
      !this.positionDropdownRef.nativeElement.contains(event.target)
    ) {
      this.isPositionDropdownOpen = false;
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

  getVisiblePageNumbers(): number[] {
    const visiblePages: number[] = [];
    const totalPages = Math.ceil(this.filteredPlayers.length / this.playersPerPage);

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
    return Math.ceil(this.filteredPlayers.length / this.playersPerPage);
  }


  isPlayerDetailPopupOpen: boolean = false;
  //PLAYER DETAILS
  showPlayerDetails(player: Player): void {
    this.selectedPlayer = player; // Set the selected player
    this.isPlayerDetailPopupOpen = true;
  }

  closePlayerDetailPopup(): void {
    this.selectedPlayer = null;
    this.isPlayerDetailPopupOpen = false;
  }


}
