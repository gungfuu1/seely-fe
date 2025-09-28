import {  Component } from '@angular/core';
import { LabService } from '../../services/lab.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-lab',
  imports: [CommonModule],
  template: `<p>{{ labName }}</p>`,
  styleUrl: './lab.component.css',
})
export class LabComponent {
  constructor(private labService: LabService) {}
  labName = '';
  ngOnInit() {
    this.labService.getLabData().then((data) => {
      console.log(data);
      this.labName = data.name;
    });
  }
}
