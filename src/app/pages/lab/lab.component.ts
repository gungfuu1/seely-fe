import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabService } from '../../services/lab.service';

@Component({
  selector: 'page-lab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
  itemSeries: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private labService: LabService) {}

  ngOnInit(): void {
    this.labService.getItemSeries().subscribe({
      next: (res) => {
        this.itemSeries = res.data; // ใช้ data จาก response ของ BE
        this.loading = false;
      },
      error: (err) => {
        this.error = 'โหลดข้อมูลไม่สำเร็จ 😢';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
