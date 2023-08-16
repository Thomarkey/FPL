import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { StatName } from 'src/app/models/statName.enum';

@Component({
  selector: 'app-player-detail-popup',
  templateUrl: './player-detail-popup.component.html',
  styleUrls: ['./player-detail-popup.component.scss']
})
export class PlayerDetailPopupComponent {

  @Input() selectedPlayer: Player | null = null;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();


  playerStatsFirstHalf: StatName[] = [];
  playerStatsSecondHalf: StatName[] = [];

  ngOnInit(): void {
    const statsKeys = Object.keys(this.selectedPlayer?.stats || {});
    const halfLength = Math.ceil(statsKeys.length / 2);
    this.playerStatsFirstHalf = statsKeys.slice(0, halfLength) as StatName[];
    this.playerStatsSecondHalf = statsKeys.slice(halfLength) as StatName[];
  }

  closePopup(): void {
    this.close.emit();
  }

  //TODO: add close when clicked outside of popup

}
