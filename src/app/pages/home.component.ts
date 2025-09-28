import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  standalone: true,
  template: `<section>
    <h2>Welcome to Seely</h2>
    <p>This is the home page.</p>
  </section>`,
  styles: [`section{padding:8px 0}`]
})
export class HomeComponent {}
