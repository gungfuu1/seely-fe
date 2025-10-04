import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './series-detail.component.html',
})
export class SeriesDetailComponent {
  series: any = null;
  id!: number;
  username: string | null = null;
  score = 0;
  hasVoted = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.username = localStorage.getItem('username'); // ✅ ดึงจาก localStorage

    this.loadSeries();
  }

  loadSeries() {
    this.http
      .get(`http://localhost:3000/api/v1/item-series/${this.id}`)
      .subscribe((res: any) => {
        this.series = res;
      });
  }

  submitVote() {
    if (!this.username) {
      alert('กรุณาเข้าสู่ระบบก่อนโหวต');
      return;
    }

    if (this.score < 1 || this.score > 5) {
      alert('กรุณาเลือกคะแนน 1-5');
      return;
    }

    this.isSubmitting = true;

    this.http
      .post(`http://localhost:3000/api/v1/item-series/${this.id}/rate`, {
        score: this.score,
        username: this.username,
      })
      .subscribe({
        next: (res: any) => {
          alert('ขอบคุณสำหรับการโหวต!');
          this.hasVoted = true;
          this.isSubmitting = false;
          this.loadSeries(); // โหลดใหม่เพื่ออัปเดต avg
        },
        error: (err) => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการโหวต');
          this.isSubmitting = false;
        },
      });
  }
}
