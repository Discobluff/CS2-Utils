import { Routes } from '@angular/router';

export const routes: Routes = [];
routes.push({
    path: 'maps',
    loadComponent: () => import('./maps/maps.component').then(m => m.MapsComponent)
});