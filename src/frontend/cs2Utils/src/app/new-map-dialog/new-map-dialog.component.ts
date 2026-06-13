import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NewMap } from '../../lib/lib'

@Component({
  selector: 'app-new-map-dialog',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './new-map-dialog.component.html',
  styleUrl: '../popup/popup.css'
})
export class NewMapDialogComponent {
  @Input() isOpen: boolean = false;
  @Output() cancelled = new EventEmitter<void>();
  @Output() created = new EventEmitter<NewMap>();

  newMap: NewMap = {name: '', asset_name: '', asset: new File([], '')};

  handleCreate() {
      this.created.emit(this.newMap);
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.handleCancel();
  }

  onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    console.log(input.files[0]);
    this.newMap.asset = input.files[0];
  }
}

}
