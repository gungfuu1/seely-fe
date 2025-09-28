import { Component } from '@angular/core';

@Component({
  selector: 'page-about',
  standalone: true,
  template: `<section>
    <h2>About Seely</h2>
    <p>Simple demo app for layout and pages.</p>
  </section>`,
  styles: [`section{padding:8px 0}`]
})
export class AboutComponent {}
