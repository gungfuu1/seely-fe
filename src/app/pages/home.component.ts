import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabService } from '../services/lab.service';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemSeries: any[] = [];

  constructor(private labService: LabService) {}

  ngOnInit(): void {
    this.labService.getItemSeries().subscribe({
      next: (res) => {
        this.itemSeries = res.data; // ← ใช้ .data ตาม response
      },
      error: (err) => console.error(err)
    });
  }
}
