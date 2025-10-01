import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { SeriesDetailComponent } from './pages/series-detail.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'login', component: LoginComponent },
  { path: 'item-series/:id', component: SeriesDetailComponent },
];
