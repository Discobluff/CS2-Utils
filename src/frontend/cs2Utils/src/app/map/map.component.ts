import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, Stuff } from '../../lib/map';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LineupDialogComponent } from '../lineup-dialog/lineup-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environments';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgFor, MatIconModule, MatButtonModule, RouterLink, LineupDialogComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  mapSelected: string | null = null;
  teamSelected: string | null = null;
  stuffSelected: string | null = null;

  teams: Team[] = [];
  
  getTeams() {
    this.http.get<[]>(`${environment.apiUrl}/teams`).subscribe({
      next: (data) => {
        this.teams = data;
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
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
    });
  }

  pickTeam(teamId: string) {
    this.router.navigate(['/maps/' + this.mapSelected + '/' + teamId + '/' + this.stuffSelected])
  }

  pickStuff(stuffId: string) {
    this.router.navigate(['/maps/' + this.mapSelected + '/' + this.teamSelected + '/' + stuffId])
  }

  dialogOpen = false;

  onCreated(value: string) {
    console.log('Created:', value);
    this.dialogOpen = false;
  }
}
