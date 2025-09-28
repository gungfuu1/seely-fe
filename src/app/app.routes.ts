import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { ContactComponent } from './pages/contact.component';

// The application template (`app.html`) renders <app-layout> statically.
// LayoutComponent contains a <router-outlet> where page components will be
// rendered. To avoid mounting LayoutComponent twice (once statically and
// once via the router), expose the pages directly at the top-level routes.
export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'contact', component: ContactComponent }
];
