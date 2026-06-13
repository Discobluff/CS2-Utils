import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MapInfo, NewMap } from '../../lib/lib';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environments';
import { NewMapDialogComponent } from '../new-map-dialog/new-map-dialog.component';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [NgFor, NewMapDialogComponent],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  constructor(private router: Router, private http: HttpClient) { }

  maps: MapInfo[] = [];

  newMapDialogOpen: boolean = false;

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

  goToMap(map: string) {
    this.router.navigate(['/maps/' + map + '/t/smoke'])
  }

  addNewMap(newMap: NewMap) {
    const formData = new FormData();
    formData.append('name', newMap.name);
    formData.append('asset_name', newMap.asset_name);
    formData.append('asset', newMap.asset);

    this.http.post(`${environment.apiUrl}/maps`, formData).subscribe({
      next: (data) => {
        this.newMapDialogOpen = false;
        this.getMaps();
      },
      error: (error) => {
        console.error('Error adding map:', error);
      }
    });
  }

}
