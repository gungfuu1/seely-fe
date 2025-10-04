import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = null;

    this.http.post<any>('http://localhost:3000/api/v1/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        const token = res.accessToken;
        if (!token) {
          this.error = 'ไม่พบ accessToken';
          this.loading = false;
          return;
        }

        // ✅ decode JWT payload
        let payload: any = {};
        try {
          payload = JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          console.error('[Login] decode JWT error:', e);
          this.error = 'Token ไม่ถูกต้อง';
          this.loading = false;
          return;
        }

        console.log('[Login] Full JWT Payload:', payload);

        // ✅ เก็บ user + token ผ่าน AuthService
        this.authService.setLogin(
          {
            username: payload.preferred_username || payload.username || '',
            firstName: payload.given_name || payload.firstName || '',
            lastName: payload.family_name || payload.lastName || '',
            email: payload.email || '',
            role: payload.role || (payload.realm_access?.roles?.[0] || '')
          },
          token
        );

        this.loading = false;

        // redirect ไปหน้า home
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.error = 'เข้าสู่ระบบไม่สำเร็จ';
        this.loading = false;
      }
    });
  }
}
