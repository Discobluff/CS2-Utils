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
  stuffSelected: string = "";

  teams: Team[] = [];
  lineups: Lineup[] = [];

  widthImage: number = 0;
  heightImage: number = 0;

  choosingStart: boolean = false;
  xLineupSelected: number = -1;
  yLineupSelected: number = -1;

  getSizeLayout() {
    const imageElement = document.getElementById('map-image') as HTMLImageElement;
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      this.widthImage = rect.width;
      this.heightImage = rect.height;
    }
  }

  createNewLineup(): Lineup {
    return {id: undefined, map_id:this.mapSelected,  stuff_id: this.stuffSelected, team_id: this.teamSelected, video_link: '', jump: false, coords_x_start: this.coords_x_start, coords_y_start: this.coords_y_start, click_type: '', position: '', movement: '', video_start: undefined, video_end: undefined, coords_x_end: this.coords_x_end, coords_y_end: this.coords_y_end};
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
        console.log(this.lineups);
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
    newLineup.id = undefined;
    this.http.post<[]>(`${environment.apiUrl}/lineups`, newLineup).subscribe({
      next: (data) => {
        this.getLineups();
      },
      error: (error) => {
        console.error('Error creating lineup:', error);
      }
    });
  }

  deleteLineup(lineup: Lineup | undefined) {
    if (lineup != undefined){
      this.http.delete<[]>(`${environment.apiUrl}/lineups/${lineup.id}`).subscribe({
        next: (data) => {
          this.getLineups();
        },
        error: (error) => {
          console.error('Error deleting lineup:', error);
        }
      });
    }
  }

  getXLineupStart(lineup: Lineup): number {
    this.getSizeLayout();
    return lineup.coords_x_start * this.widthImage - 16;
  }

  getYLineupStart(lineup: Lineup): number {
    return lineup.coords_y_start * this.heightImage - 16;
  }

  getXLineupEnd(lineup: Lineup): number {
    this.getSizeLayout();
    return lineup.coords_x_end * this.widthImage - 16;
  }

  getYLineupEnd(lineup: Lineup): number {
    return lineup.coords_y_end * this.heightImage - 16;
  }

  handleClickOnLineupStart(lineup: Lineup) {
    this.panelOpen=true;
    this.setPanelLineup(lineup);
  }

  handleSelectionCancel() {
    this.choosingStart = false;
    this.xLineupSelected = -1;
    this.yLineupSelected = -1;
  }

  getColor(): string {
    if (this.teamSelected == "t") return "#F0B100";
    if (this.teamSelected == "ct") return "#2B7FFF";
    return "gray";
  }

  handleClickOnLineup(lineup: Lineup): void {
    this.xLineupSelected = lineup.coords_x_end;
    this.yLineupSelected = lineup.coords_y_end
  }

  handleClickOnMap(event: MouseEvent, img: HTMLImageElement): void {
    let coords = this.getPixels(event, img);
    if (this.choosingStart) {
      this.coords_x_start = coords[0];
      this.coords_y_start = coords[1];
      this.dialogNewLineup = this.createNewLineup(); // TODO : refactor remove x,y coords and remember lineup
      this.dialogOpen = true
      this.choosingStart = false;
    } else {
      this.coords_x_end = coords[0];
      this.coords_y_end = coords[1];
      this.choosingStart = true
    }
  }

  getPixels(event: MouseEvent, img: HTMLImageElement): [number, number] {
    const rect = img.getBoundingClientRect();
    let x = (event.clientX - rect.left) / (rect.right - rect.left);
    let y = (event.clientY - rect.top) / (rect.bottom - rect.top);
    return [x, y];
  }

  setPanelLineup(lineup: Lineup) {
    this.panelLineup = lineup;
  }

  panelLineup: Lineup | undefined;
  dialogNewLineup: Lineup = this.createNewLineup();
  dialogOpen = false;
  panelOpen = false;
  coords_x_end = 0;
  coords_y_end = 0;
  coords_x_start = 0;
  coords_y_start = 0;
}
