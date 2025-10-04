import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  user: any = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userData = {
          username: payload.preferred_username || payload.username || '',
          firstName: payload.given_name || payload.firstName || '',
          lastName: payload.family_name || payload.lastName || '',
          email: payload.email || '',
          role: payload.role || (payload.realm_access?.roles?.[0] || '')
        };

        // ✅ เซฟผ่าน AuthService
        this.authService.setLogin(userData, token);

        // clear query string ออกจาก URL
        this.router.navigate([], { queryParams: {} });

        this.user = userData;
      } catch (e) {
        console.error('[Layout] decode token error', e);
      }
    } else {
      this.user = this.authService.getCurrentUser();
    }
  }

  login() {
    this.authService.logout();
    window.location.href = 'http://localhost:3000/api/v1/auth/login/keycloak';
  }

  logout() {
    this.authService.logout();
    this.user = null;
    window.location.href = 'http://localhost:3000/api/v1/auth/logout';
  }
}
