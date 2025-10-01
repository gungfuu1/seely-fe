import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  series: any[] = [];
  meta: any;
  currentPage = 1;
  limit = 6;

  constructor(private http: HttpClient) {}

 ngOnInit() {
    this.loadSeries();
  }

  loadSeries(page: number = 1) {
    this.http.get<any>(`http://localhost:3000/api/v1/item-series?page=${page}&limit=${this.limit}`)
      .subscribe({
        next: (res) => {
          this.series = res.data;
          this.meta = res.meta;
          this.currentPage = res.meta.currentPage;
        },
        error: (err) => console.error(err)
      });
  }

  nextPage() {
    if (this.meta && this.currentPage < this.meta.totalPages) {
      this.loadSeries(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadSeries(this.currentPage - 1);
    }
  }
}
