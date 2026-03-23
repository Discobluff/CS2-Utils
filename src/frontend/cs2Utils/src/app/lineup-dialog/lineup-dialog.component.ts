import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Lineup, Stuff } from '../../lib/lib';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './lineup-dialog.component.html',
  styleUrl: './lineup-dialog.component.css'
})
export class LineupDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() stuffs: Stuff[] = [];
  @Input() coords_x: number = 0;
  @Input() coords_y: number = 0;
  @Output() cancelled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Lineup>();

  newLineup: Lineup = this.createNewLineup();

  createNewLineup(): Lineup {
    return {id: 0, map_id:'',  stuff_id: '', team_id: '', video_link: '', jump: false, coords_x_start: 0, coords_y_start: 0, click_type: 'left_click', position: 'stand', movement: 'stand', video_start: undefined, video_end: undefined, coords_x_end: 0, coords_y_end: 0};
  }

  handleCreate() {
    this.newLineup.coords_x_start = this.coords_x;
    this.newLineup.coords_y_start = this.coords_y;
    this.created.emit(this.newLineup);
    this.newLineup = this.createNewLineup();
  }

  handleCancel() {
    this.newLineup = this.createNewLineup();
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.handleCancel();
  }
}