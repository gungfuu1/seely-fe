import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-series-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="series">
      <h2>{{ series.name }} ({{ series.year }})</h2>
      <img [src]="series.imageUrl" alt="{{ series.name }}" style="max-width:300px;display:block;margin-bottom:16px;">
      <p><b>Description:</b> {{ series.description }}</p>
      <p><b>Rating:</b> {{ series.rating?.name }}</p>
      <p><b>Owner Score:</b> {{ series.ownerScore?.name }}</p>
      <p><b>Average Rating:</b> {{ series.avg_rating }} (from {{ series.rating_count }} votes)</p>
      <p><b>Added by:</b> {{ series.user?.username }}</p>
    </section>
    <section *ngIf="!series">
      <p>Loading series detail...</p>
    </section>
  `
})
export class SeriesDetailComponent implements OnInit {
  series: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/api/v1/item-series/${id}`)
        .subscribe(data => this.series = data);
    }
  }
}
