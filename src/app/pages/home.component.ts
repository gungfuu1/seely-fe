import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  series: any[] = [];
  filteredSeries: any[] = [];
  meta: any;
  currentPage = 1;
  limit = 6;

  searchTerm: string = '';
  sortOrder: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSeries();
  }

  loadSeries(page: number = 1) {
  const params: any = {
    page: page,
    limit: this.limit,
    usePaginateLib: true,
  };

  if (this.searchTerm.trim()) {
    params.search = this.searchTerm.trim();
  }

  if (this.sortOrder) {
    params.sortBy = `avg_rating:${this.sortOrder.toUpperCase()}`;
  }

  this.http.get<any>('http://localhost:3000/api/v1/item-series', { params })
    .subscribe({
      next: (res) => {
        this.series = res.data;
        this.meta = res.meta;
        this.currentPage = res.meta.currentPage;
        this.applyFilters();  
      },
      error: (err) => console.error(err)
    });
}


  applyFilters() {
    let result = [...this.series];

    // Filter by search term
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          (item.description && item.description.toLowerCase().includes(term))
      );
    }

    // Sort by avg_rating
    if (this.sortOrder === 'asc') {
      result.sort((a, b) => (a.avg_rating ?? 0) - (b.avg_rating ?? 0));
    } else if (this.sortOrder === 'desc') {
      result.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0));
    }

    this.filteredSeries = result;
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
