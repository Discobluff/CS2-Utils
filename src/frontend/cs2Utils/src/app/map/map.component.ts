import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, Stuff, Lineup } from '../../lib/lib';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LineupDialogComponent } from '../lineup-dialog/lineup-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environments';
import { LineupPanelComponent } from '../lineup-panel/lineup-panel.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule, MatButtonModule, RouterLink, LineupDialogComponent, LineupPanelComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  mapSelected: string = "";
  teamSelected: string = "";
  stuffSelected: string | null = null;

  teams: Team[] = [];
  lineups: Lineup[] = [];

  widthImage: number = 0;
  heightImage: number = 0;

  getSizeLayout() {
    const imageElement = document.getElementById('map-image') as HTMLImageElement;
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      this.widthImage = rect.width;
      this.heightImage = rect.height;
    }
  }

  getTeams() {
    this.http.get<[]>(`${environment.apiUrl}/teams`).subscribe({
      next: (data) => {
        this.teams = data;
        this.teams.push({ id: "any", name: "Any", asset_name: "any" })
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
      }
    });
  }

  getLineups() {
    this.http.get<[]>(`${environment.apiUrl}/lineups?map_id=${this.mapSelected}`).subscribe({
      next: (data) => {
        this.lineups = data;
      },
      error: (error) => {
        console.error('Error fetching lineups:', error);
      }
    });
  }

  stuffs: Stuff[] = [];

  getStuffs() {
    this.http.get<[]>(`${environment.apiUrl}/stuffs`).subscribe({
      next: (data) => {
        this.stuffs = data;
      },
      error: (error) => {
        console.error('Error fetching stuffs:', error);
      }
    });
  }

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mapSelected = params['mapName'];
      this.teamSelected = params['team'];
      this.stuffSelected = params['stuff'];
      this.getTeams();
      this.getStuffs();
      this.getLineups();
    });
  }

  pickTeam(teamId: string) {
    this.router.navigate(['/maps/' + this.mapSelected + '/' + teamId + '/' + this.stuffSelected])
  }

  pickStuff(stuffId: string) {
    this.router.navigate(['/maps/' + this.mapSelected + '/' + this.teamSelected + '/' + stuffId])
  }

  addNewLineup(newLineup: Lineup) {
    newLineup.map_id = this.mapSelected;
    this.dialogOpen = false;
    this.http.post<[]>(`${environment.apiUrl}/lineups`, newLineup).subscribe({
      next: (data) => {
        this.getLineups();
      },
      error: (error) => {
        console.error('Error creating lineup:', error);
      }
    });
  }

  getXLineup(lineup: Lineup): number {
  this.getSizeLayout();
    return lineup.coords_x * this.widthImage-16;
  }

  getYLineup(lineup: Lineup): number {
    return lineup.coords_y * this.heightImage -16;
  }

  getPixels(event: MouseEvent, img: HTMLImageElement): void {
    const rect = img.getBoundingClientRect();
    this.coords_x = (event.clientX - rect.left) / (rect.right - rect.left);
    this.coords_y = (event.clientY - rect.top) / (rect.bottom - rect.top);
  }

  setPanelLineup(lineup: Lineup){
    this.panelLineup = lineup;
  }

  panelLineup: Lineup | undefined;
  dialogOpen = false;
  panelOpen = false;
  coords_x = 0;
  coords_y = 0;
}
