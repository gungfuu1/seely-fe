import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { SeriesDetailComponent } from './pages/series-detail.component';
import { ItemSeriesCreateComponent } from './pages/item-series/item-series-create.component';
import { SeriesUpdateComponent } from './pages/series-update.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item-series/create', component: ItemSeriesCreateComponent },
  { path: 'item-series/update/:id', component: SeriesUpdateComponent },
  { path: 'item-series/:id', component: SeriesDetailComponent },
];
