import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-series-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Update Series</h2>
    <form (ngSubmit)="onSubmit()">
      <label>ชื่อเรื่อง</label>
      <input [(ngModel)]="series.name" name="name" />

      <label>คำอธิบาย</label>
      <textarea [(ngModel)]="series.description" name="description"></textarea>

      <label>ปี</label>
      <input type="number" [(ngModel)]="series.year" name="year" />

      <button type="submit">บันทึก</button>
    </form>
  `
})
export class SeriesUpdateComponent {
  series: any = { name: '', description: '', year: 2025 };
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.http.get(`http://localhost:3000/api/v1/item-series/${this.id}`)
        .subscribe((res: any) => {
          this.series = res;
        });
    }
  }

  onSubmit() {
  if (this.id) {
    const token = localStorage.getItem('accessToken'); // 👈 token จาก login

    this.http.patch(
      `http://localhost:3000/api/v1/item-series/${this.id}`,
      this.series,
      {
        headers: {
          Authorization: `Bearer ${token}` // 👈 แนบไป
        }
      }
    ).subscribe({
      next: () => {
        alert('อัพเดทสำเร็จ');
        this.router.navigate(['/item-series', this.id]);
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('เกิดข้อผิดพลาด: ' + err.message);
      }
    });
  }
}


}
