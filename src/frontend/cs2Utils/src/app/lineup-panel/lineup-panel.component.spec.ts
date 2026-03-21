import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupPanelComponent } from './lineup-panel.component';

describe('LineupPanelComponent', () => {
  let component: LineupPanelComponent;
  let fixture: ComponentFixture<LineupPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineupPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
