import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { LabComponent } from './pages/lab/lab.component';
import { SeriesDetailComponent } from './pages/series-detail.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'lab', component: LabComponent },
  { path: 'item-series/:id', component: SeriesDetailComponent },
];
