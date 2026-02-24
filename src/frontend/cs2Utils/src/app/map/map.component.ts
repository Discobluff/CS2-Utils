import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, Stuff, Lineup } from '../../lib/lib';
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

  mapSelected: string = "";
  teamSelected: string = "";
  stuffSelected: string | null = null;

  teams: Team[] = [];
  lineups: Lineup[] = [];
  
  getTeams() {
    this.http.get<[]>(`${environment.apiUrl}/teams`).subscribe({
      next: (data) => {
        this.teams = data;
        this.teams.push({id: "any", name: "Any", asset_name: "any"})
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
      }
    });
  }

  getLineups() {
      this.http.get<[]>(`${environment.apiUrl}/lineups`).subscribe({
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
      console.log(this.lineups);
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
    newLineup.team_id = this.teamSelected;
    newLineup.coords_x = 50;
    newLineup.coords_y = 50;
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

  dialogOpen = false;
}
