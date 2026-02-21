import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './lineup-dialog.component.html',
  styleUrl: './lineup-dialog.component.css'
})
export class LineupDialogComponent {
  @Input() isOpen = false;
  @Input() stuffs = [
    {name: "Smoke", id: "smoke"},
  ]
  @Output() cancelled = new EventEmitter<void>();
  @Output() created = new EventEmitter<string>();

  stuffSelected = '';

  handleCreate() {
    if (!this.stuffSelected.trim()) return;
    this.created.emit(this.stuffSelected.trim());
    this.stuffSelected = '';
  }

  handleCancel() {
    this.stuffSelected = '';
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.handleCancel();
  }
}