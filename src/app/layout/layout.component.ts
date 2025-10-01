import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  // mock user → ตอนนี้ทดสอบเฉย ๆ
  user: { username: string } | null = null;

  // Keycloak login URL
  loginUrl =
    'https://sso-dev.odd.works/realms/pea-devpool-2025/protocol/openid-connect/auth' +
    '?client_id=wongnok' +
    '&scope=openid%20email%20profile' +
    '&response_type=code' +
    '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fkeycloak';

  constructor() {
    // TODO: ตรงนี้เดี๋ยวต้องเปลี่ยนไปดึง user จาก localStorage หรือ API หลัง login
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }
}
