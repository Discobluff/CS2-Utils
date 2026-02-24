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
  @Output() cancelled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Lineup>();

  newLineup: Lineup = this.createNewLineup();

  createNewLineup(): Lineup {
    return {id:42,map_id:'',  stuff_id: '', team_id: '', video_link: '', jump: false, coords_x: 0, coords_y: 0, click_type: 'left_click', position: 'stand', movement: 'stand'};
  }

  handleCreate() {
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