import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import this
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule], // ✅ Add CommonModule here
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  currentSlide = 0;
  slides = [
    { name: 'Mathematics 1', code: 'MATH101', note: 75 },
    { name: 'Mathematics 2', code: 'MATH102', note: 60 },
    { name: 'Physics 1', code: 'PHYS101', note: 80 },
    { name: 'Physics 2', code: 'PHYS102', note: 50 },
    { name: 'Science', code: 'SCI101', note: 90 },
  ];

  slidesPerPage = 3;

  prevSlide() {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
  }

  nextSlide() {
    const maxIndex = this.slides.length - this.slidesPerPage;
    this.currentSlide = Math.min(this.currentSlide + 1, maxIndex);
  }
}
