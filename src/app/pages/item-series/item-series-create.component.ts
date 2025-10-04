import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-series-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-series-create.component.html',
  styleUrls: ['./item-series-create.component.css'],
})
export class ItemSeriesCreateComponent {
  series = {
    name: '',
    year: new Date().getFullYear(),
    description: '',
    imageUrl: '',
    ratingId: 1,
    ownerScoreId: 1,
  };

  ratings: any[] = [];
  ownerScores: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/v1/rating')
      .subscribe(res => (this.ratings = res));

    this.http.get<any[]>('http://localhost:3000/api/v1/owner-score')
      .subscribe(res => (this.ownerScores = res));
  }

  createSeries() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert(' กรุณาเข้าสู่ระบบก่อนสร้างซีรีส์');
      return;
    }

    const payload = {
      name: this.series.name,
      year: Number(this.series.year),
      description: this.series.description,
      imageUrl: this.series.imageUrl,
      ratingId: Number(this.series.ratingId),
      ownerScoreId: Number(this.series.ownerScoreId),
    };

    this.http
      .post('http://localhost:3000/api/v1/item-series', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          alert(' สร้างซีรีส์เรียบร้อย');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(' Error creating series:', err);
          alert(' สร้างไม่สำเร็จ');
        },
      });
  }
}
