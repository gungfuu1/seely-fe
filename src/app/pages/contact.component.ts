import { Component } from '@angular/core';

@Component({
  selector: 'page-contact',
  standalone: true,
  template: `<section>
    <h2>Contact</h2>
    <p>Reach us at <a href="mailto:hello@seely.test">hello@seely.test</a>.</p>
  </section>`,
  styles: [`section{padding:8px 0}`]
})
export class ContactComponent {}
