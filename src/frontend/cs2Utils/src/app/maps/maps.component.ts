import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface MapInfo {
  name: string;
  id: string;
}

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [NgFor],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  maps: MapInfo[] = [
    { name: "DUST 2", id: "dust2" },
    { name: "MIRAGE", id: "mirage" },
    { name: "INFERNO", id: "inferno" },
  ];

}
