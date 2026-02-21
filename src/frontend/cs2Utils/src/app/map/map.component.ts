import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, Stuff } from '../../lib/map';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LineupDialogComponent } from '../lineup-dialog/lineup-dialog.component';

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

  teams: Team[] = [
    { name: "Any", id: "any" },
    { name: "T", id: "t" },
    { name: "CT", id: "ct" },

  ];

  stuffs: Stuff[] = [
    { name: "Smoke", id: "smoke"},
    { name: "Molotov", id: "molotov"},
    { name: "Flash", id: "flash"},
    { name: "HE", id: "he"},
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mapSelected = params['mapName'];
      this.teamSelected = params['team'];
      this.stuffSelected = params['stuff'];
      console.log(this.mapSelected, this.teamSelected, this.stuffSelected);
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
