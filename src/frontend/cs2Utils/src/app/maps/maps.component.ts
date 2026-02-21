import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MapInfo } from '../../lib/map';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environments';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [NgFor],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  constructor(private router: Router, private http: HttpClient) {}

  // maps: MapInfo[] = [
  //   { name: "DUST 2", id: "dust2" },
  //   { name: "MIRAGE", id: "mirage" },
  //   { name: "INFERNO", id: "inferno" },
  // ];

  maps: MapInfo[] = [];

  ngOnInit() {
    this.getMaps();
  }

  getMaps() {
    this.http.get<MapInfo[]>(`${environment.apiUrl}/maps`).subscribe({
      next: (data) => {
        this.maps = data;
      },
      error: (error) => {
        console.error('Error fetching maps:', error);
      }
    });
  }

  goToMap(map : string){
    this.router.navigate(['/maps/' + map + '/t/smoke'])
  }

}
