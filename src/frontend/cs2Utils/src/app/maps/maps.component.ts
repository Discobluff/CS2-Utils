import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [NgFor],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  maps: String[] = ["Dust2", "Mirage"];

}
