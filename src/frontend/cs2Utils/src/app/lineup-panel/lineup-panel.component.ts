import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Lineup } from '../../lib/lib';
import { MatIconRegistry } from '@angular/material/icon';




@Component({
  selector: 'lineup-panel',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './lineup-panel.component.html',
  styleUrl: './lineup-panel.component.css'
})
export class LineupPanelComponent {
  @Input() isPanelOpen: boolean = false;
  @Input() lineup: Lineup | undefined;
  @Output() cancelled = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

constructor(private _sanitizer: DomSanitizer, iconRegistry: MatIconRegistry) {
  iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
}

  handleDelete() {
    this.deleted.emit();
  }

  handleCreate() {
    this.created.emit();
  }

  handleCancel() {
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) this.handleCancel();
  }

  getVideoURL(videoURL: string, start: Number | undefined, end: Number | undefined) {
    let embeddableURL = videoURL;
    if (videoURL.includes('youtube.com/watch?v=')) {
      const videoId = new URL(videoURL).searchParams.get('v');
      embeddableURL = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoURL.includes('youtu.be/')) {
      const videoId = videoURL.split('youtu.be/')[1].split('?')[0];
      embeddableURL = `https://www.youtube.com/embed/${videoId}`;
    }
    const params = new URLSearchParams();
    if (start != undefined) params.append('start', start.toString());
    if (end != undefined) params.append('end', end.toString());
    const urlWithParams = params.toString() ? `${embeddableURL}?${params.toString()}` : embeddableURL;
    let url = this._sanitizer.bypassSecurityTrustResourceUrl(urlWithParams);
    return url;
  }

}
