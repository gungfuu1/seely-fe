import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `<app-layout></app-layout>`,
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      // เคลียร์ query string ออกหลังเก็บแล้ว
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
}
