import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css'],
})
export class SeriesDetailComponent {
  series: any = null;
  id!: number;
  user: any = null;
  score = 0;
  hasVoted = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.auth.getCurrentUser();
    console.log('🔑 Logged user:', this.user);

    if (!this.id) {
      console.warn(' No ID found in route — likely create page');
      return;
    }

    this.loadSeries();
  }

  loadSeries() {
    this.http
      .get(`http://localhost:3000/api/v1/item-series/${this.id}`)
      .subscribe({
        next: (res: any) => (this.series = res),
        error: (err) => console.error(' loadSeries error:', err),
      });
  }

  canEditOrDelete(): boolean {
    return this.user && this.series?.user?.username === this.user.username;
  }

  submitVote() {
    if (!this.user) {
      alert('! กรุณาเข้าสู่ระบบก่อนโหวต');
      return;
    }

    if (this.score < 1 || this.score > 5) {
      alert('กรุณาเลือกคะแนนระหว่าง 1 ถึง 5');
      return;
    }

    this.isSubmitting = true;

    this.http
      .post(`http://localhost:3000/api/v1/item-series/${this.id}/rate`, {
        score: this.score,
        username: this.user.username,
      })
      .subscribe({
        next: (res: any) => {
          alert(' ขอบคุณสำหรับการโหวต!');
          this.hasVoted = true;
          this.isSubmitting = false;
          this.loadSeries();
        },
        error: (err) => {
          console.error(' Error while voting:', err);
          alert('เกิดข้อผิดพลาดในการโหวต');
          this.isSubmitting = false;
        },
      });
  }

  updateSeries() {
    this.router.navigate(['/item-series/update', this.series.id]);
  }


  deleteSeries() {
  if (!this.user) {
    alert('! กรุณาเข้าสู่ระบบก่อน');
    return;
  }

  if (!this.series) {
    alert('! ไม่พบข้อมูลซีรีส์');
    return;
  }

  if (confirm(' ต้องการลบซีรีส์นี้หรือไม่?')) {
    const token = this.auth.getToken();
    
    if (!token) {
      alert('! ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      return;
    }

    // Debug logging information
    console.log('Attempting to delete series:', {
      id: this.id,
      url: `http://localhost:3000/api/v1/item-series/${this.id}`,
      token: token ? 'Present' : 'Missing'
    });

    this.http
      .delete(`http://localhost:3000/api/v1/item-series/${this.id}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .subscribe({
        next: () => {
          alert('🗑️ ลบเรียบร้อยแล้ว');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(' delete error:', err);
          if (err.status === 404) {
            alert('! ไม่พบซีรีส์ที่ต้องการลบ (ID: ' + this.id + ')');
            this.router.navigate(['/']);
          } else if (err.status === 401 || err.status === 403) {
            alert('! คุณไม่มีสิทธิ์ลบซีรีส์นี้');
          } else {
            alert(' ลบไม่สำเร็จ: ' + (err.error?.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'));
          }
        }
      });
    }
  }
}
