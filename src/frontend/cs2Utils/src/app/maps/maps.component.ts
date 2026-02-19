import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MapInfo } from '../../lib/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [NgFor],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  constructor(private router: Router) {}

  maps: MapInfo[] = [
    { name: "DUST 2", id: "dust2" },
    { name: "MIRAGE", id: "mirage" },
    { name: "INFERNO", id: "inferno" },
  ];

  goToMap(map : string){
    this.router.navigate(['/maps/' + map + '/t/smoke'])
  }

}
