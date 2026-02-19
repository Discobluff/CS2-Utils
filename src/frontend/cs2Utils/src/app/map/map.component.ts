import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, Stuff } from '../../lib/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgFor],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  mapSelected: string | null = null;
  teamSelected: string | null = null;
  stuffSelected: Stuff | null = null;

  teams: Team[] = [
    { name: "Any", id: "any" },
    { name: "T", id: "t" },
    { name: "CT", id: "ct" },

  ]

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
}
