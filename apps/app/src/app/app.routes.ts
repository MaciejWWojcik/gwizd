import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./pages/map-page/map-page.component').then(
        (m) => m.MapPageComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'live',
        pathMatch: 'full',
      },
      {
        path: 'live',
        loadComponent: () =>
          import('./pages/live-map-page/live-map-page.component').then(
            (m) => m.LiveMapPageComponent
          ),
      },
      {
        path: 'trend',
        loadComponent: () =>
          import('./pages/trend-map-page/trend-map-page.component').then(
            (m) => m.TrendMapPageComponent
          ),
      },
    ],
  },
];
