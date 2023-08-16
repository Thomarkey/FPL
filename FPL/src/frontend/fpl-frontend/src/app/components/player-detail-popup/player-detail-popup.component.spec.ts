import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailPopupComponent } from './player-detail-popup.component';

describe('PlayerDetailPopupComponent', () => {
  let component: PlayerDetailPopupComponent;
  let fixture: ComponentFixture<PlayerDetailPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerDetailPopupComponent]
    });
    fixture = TestBed.createComponent(PlayerDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
