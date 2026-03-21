import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'lineup-panel',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './lineup-panel.component.html',
  styleUrl: './lineup-panel.component.css'
})
export class LineupPanelComponent {
  @Input() isPanelOpen: boolean = false;
  @Output() cancelled = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();


  handleCreate() {
    this.created.emit();
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.handleCancel();
  }
}
