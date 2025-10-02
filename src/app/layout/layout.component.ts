import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  user: { username?: string; firstName?: string } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const firstName = urlParams.get('firstName');
    const username = urlParams.get('user');

    if (token) {
      // ✅ เก็บ token และ user ลง localStorage
      localStorage.setItem('accessToken', token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: username || '',
          firstName: firstName || username || '',
        }),
      );

      // clear query string ออกจาก URL
      this.router.navigate([], { queryParams: {} });

      this.user = { username: username || '', firstName: firstName || username || '' };
    } else {
      // ✅ ถ้ามี user เก็บไว้แล้ว
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    }
  }

  // ฟังก์ชัน login
  login() {
    // เคลียร์ localStorage ก่อนทุกครั้ง → บังคับให้ไป Keycloak
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    window.location.href = 'http://localhost:3000/api/v1/auth/login/keycloak';
  }

  // ฟังก์ชัน logout
  logout() {
    fetch('http://localhost:3000/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        // เคลียร์ token ใน FE
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this.user = null;

        // redirect กลับหน้า Home
        window.location.href = data.logoutUrl || 'http://localhost:4200/';
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        // fallback redirect
        window.location.href = 'http://localhost:4200/';
      });
  }
}
