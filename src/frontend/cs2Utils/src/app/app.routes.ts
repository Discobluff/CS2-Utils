import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'maps',
        loadComponent: () => import('./maps/maps.component').then(m => m.MapsComponent)
    },
    {
        path: 'maps/:mapName/:team/:stuff',
        loadComponent: () => import('./map/map.component').then(m => m.MapComponent)
    }
];