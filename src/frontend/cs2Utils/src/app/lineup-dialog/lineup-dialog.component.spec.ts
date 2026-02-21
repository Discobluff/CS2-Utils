import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupDialogComponent } from './lineup-dialog.component';

describe('LineupDialogComponent', () => {
  let component: LineupDialogComponent;
  let fixture: ComponentFixture<LineupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineupDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
