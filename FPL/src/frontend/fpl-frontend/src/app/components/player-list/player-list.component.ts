import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { StatName, getStatNameCategory } from 'src/app/models/statName.enum';
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
  StatNames: StatName[] = Object.values(StatName);
  selectedCategory: string | null = null;


  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {
      this.players = data;
      // Initialize selectedStats with pre-selected stats
      this.preSelectedStats.forEach(stat => this.selectedStats.add(stat));
      this.filteredPlayers = [...this.players];
    });
  };


  //SORTING OF COLUMNS
  sortDirection: 'asc' | 'desc' = 'asc';
  sortStatBy: StatName | null = null;
  sortColumnBy: string | 'points' | null = null;

  toggleStatSort(stat: StatName): void {
    if (this.sortStatBy === stat) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortStatBy = stat;
      this.sortDirection = 'desc';

      this.sortColumnBy = null;

    }
    this.statSort();
  }

  toggleColumnSort(column: string): void {
    if (this.sortColumnBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnBy = column;
      this.sortDirection = 'desc';

      this.sortStatBy = null;
    }
    this.columnSort();
  }

  columnSort(): void {
    if (this.sortColumnBy === 'points') {
      this.filteredPlayers.sort((a, b) => {
        const aValue = a.totalPoints;
        const bValue = b.totalPoints;
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
    else if (this.sortColumnBy === 'name') {
      this.filteredPlayers.sort((a, b) => {
        const aValue = a.name.toLowerCase();
        const bValue = b.name.toLowerCase();
        return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    } else if (this.sortColumnBy === 'team') {
      this.filteredPlayers.sort((a, b) => {
        const aValue = a.team.toLowerCase();
        const bValue = b.team.toLowerCase();
        return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    } else if (this.sortColumnBy === 'position') {
      this.filteredPlayers.sort((a, b) => {
        const aValue = a.position.toLowerCase();
        const bValue = b.position.toLowerCase();
        return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }
  }


  statSort(): void {
    if (this.sortStatBy) {
      this.filteredPlayers.sort((a, b) => {
        const aValue = a.stats[this.sortStatBy!] || 0;
        const bValue = b.stats[this.sortStatBy!] || 0;
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

  selectedTeams: Set<Team> = new Set(this.Teams);
  selectedPositions: Set<Position> = new Set(this.Positions);


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

    // Store current sorting state
    const prevSortStatBy = this.sortStatBy;
    const prevSortColumnBy = this.sortColumnBy;
    const prevSortDirection = this.sortDirection;

    const lowerCaseQuery = this.searchQuery.toLowerCase();

    this.filteredPlayers = this.players.filter(player =>
      player.name.toLowerCase().includes(lowerCaseQuery) &&
      (this.selectedTeams.size === 0 || this.selectedTeams.has(player.team)) &&
      (this.selectedPositions.size === 0 || this.selectedPositions.has(player.position))
    );

    // Reapply sorting
    this.sortStatBy = prevSortStatBy;
    this.sortColumnBy = prevSortColumnBy;
    this.sortDirection = prevSortDirection;

    // Apply sorting function based on sorting type
    if (this.sortStatBy) {
      this.statSort();
    } else if (this.sortColumnBy) {
      this.columnSort();
    }

  }

  getSelected(key: string): string {
    const numSelected = key === 'positions' ? this.selectedPositions.size :
      key === 'teams' ? this.selectedTeams.size :
        key === 'stats' ? this.selectedStats.size : 0;

    const totalItems = key === 'positions' ? this.Positions.length :
      key === 'teams' ? this.Teams.length :
        key === 'stats' ? this.StatNames.length : 0;

    if (numSelected === 0) {
      return 'none';
    } else if (numSelected === totalItems) {
      return 'all';
    } else {
      return numSelected.toString();
    }
  }

  //(de)select label in dropdowns
  selectAllItems(key: string) {
    let items: Set<string>;
    let allItems: string[];

    if (key === 'positions') {
      items = this.selectedPositions;
      allItems = this.Positions;
    } else if (key === 'teams') {
      items = this.selectedTeams;
      allItems = this.Teams;
    } else if (key === 'stats') {
      items = this.selectedStats;
      allItems = Object.keys(this.players[0]?.stats || {});
    } else {
      return; // Invalid key, do nothing
    }

    if (this.getSelected(key) === 'all') {
      // If all items are selected, deselect all
      allItems.forEach(item => {
        items.delete(item);
      });
    } else {
      // Otherwise, select all items
      allItems.forEach(item => {
        items.add(item);
      });
    }
    this.filterPlayers();
  }

  //add and (de)select all categories
  getUniqueStatCategories(): string[] {
    const categories = new Set<string>();
    this.StatNames.forEach(statName => {
      const category = getStatNameCategory(statName);
      if (category) {
        categories.add(category);
      }
    });
    return Array.from(categories);
  }

  getStatsInCategory(category: string): StatName[] {
    return this.StatNames.filter(statName => getStatNameCategory(statName) === category);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  toggleCategoryStats(category: string): void {
    const statsInCategory = this.getStatsInCategory(category);

    if (this.areAllStatsInCategorySelected(statsInCategory)) {
      this.deselectAllStats(statsInCategory);
    } else {
      this.selectAllStats(statsInCategory);
    }
  }

  areAllStatsInCategorySelected(statsInCategory: StatName[]): boolean {
    return statsInCategory.every(stat => this.selectedStats.has(stat));
  }

  selectAllStats(statsInCategory: StatName[]): void {
    statsInCategory.forEach(stat => this.selectedStats.add(stat));
  }

  deselectAllStats(statsInCategory: StatName[]): void {
    statsInCategory.forEach(stat => this.selectedStats.delete(stat));
  }


  //SEARCH FCTION
  searchQuery: string = '';
  filteredPlayers: Player[] = [];

  clearSearch(): void {
    this.searchQuery = '';
    this.filterPlayers();
  }

  performSearch(): void {
    this.currentPage = 1;

    // Store current sorting state
    const prevSortStatBy = this.sortStatBy;
    const prevSortColumnBy = this.sortColumnBy;
    const prevSortDirection = this.sortDirection;

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    this.filteredPlayers = this.players.filter(player =>
      player.name.toLowerCase().includes(lowerCaseQuery) &&
      (this.selectedTeams.size === 0 || this.selectedTeams.has(player.team)) &&
      (this.selectedPositions.size === 0 || this.selectedPositions.has(player.position))
    );

    // Reapply sorting
    this.sortStatBy = prevSortStatBy;
    this.sortColumnBy = prevSortColumnBy;
    this.sortDirection = prevSortDirection;

    // Apply sorting function based on sorting type
    if (this.sortStatBy) {
      this.statSort();
    } else if (this.sortColumnBy) {
      this.columnSort();
    }
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
