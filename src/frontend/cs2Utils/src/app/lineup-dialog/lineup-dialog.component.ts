import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Lineup, Stuff } from '../../lib/lib';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, MatIconModule],
  templateUrl: './lineup-dialog.component.html',
  styleUrl: '../popup/popup.css'
})
export class LineupDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() stuffs: Stuff[] = [];
  @Input() newLineup: Lineup | undefined;
  @Input() edition: boolean = false;
  @Output() cancelled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Lineup>();
  @Output() edited = new EventEmitter<Lineup>();

  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  handleEdit() {
    if (this.newLineup != undefined){
      this.edited.emit(this.newLineup);
    } else {
      this.cancelled.emit();
    }
  }

  handleCreate() {
    if (this.newLineup != undefined){
      this.created.emit(this.newLineup);
    } else {
      this.cancelled.emit();
    }
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.handleCancel();
  }
}