import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { SeriesDetailComponent } from './pages/series-detail.component';
import { SeriesUpdateComponent } from './pages/series-update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item-series/:id', component: SeriesDetailComponent },
  { path: 'item-series/:id/update', component: SeriesUpdateComponent },
];
