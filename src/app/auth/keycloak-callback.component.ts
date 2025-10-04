import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-keycloak-callback',
  standalone: true,
  template: `<p>กำลังเข้าสู่ระบบผ่าน Keycloak...</p>`,
})
export class KeycloakCallbackComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // ดึง code จาก URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      alert('ไม่มีโค้ดจาก Keycloak');
      this.router.navigate(['/login']);
      return;
    }

    // เรียก backend เพื่อแลก token
    this.http
      .get(`http://localhost:3000/api/v1/auth/callback/keycloak${window.location.search}`)
      .subscribe({
        next: (res: any) => {
          console.log(' Login success:', res);

          // ดึงข้อมูล user จาก backend
          this.http
            .get('http://localhost:3000/api/v1/auth/me', {
              headers: { Authorization: `Bearer ${res.accessToken}` },
            })
            .subscribe((user: any) => {
              console.log('👤 User loaded:', user);

              // บันทึก user และ token ลง localStorage ผ่าน AuthService
              this.authService.setLogin(user, res.accessToken);

              // redirect ไปหน้า home
              this.router.navigate(['/']);
            });
        },
        error: (err) => {
          console.error(' Keycloak login failed:', err);
          alert('เข้าสู่ระบบล้มเหลว');
          this.router.navigate(['/login']);
        },
      });
  }
}
