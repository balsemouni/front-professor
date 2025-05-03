import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-availability-matrix',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './availability-matrix.component.html',
  styleUrls: ['./availability-matrix.component.css'],
})
export class AvailabilityMatrixComponent {
  loading = false;

  days: string[] = [
    'Mardi [07-01-2025]',
    'Mercredi [08-01-2025]',
    'Jeudi [09-01-2025]',
    'Vendredi [10-01-2025]',
    'Lundi [13-01-2025]',
    'Mardi [14-01-2025]',
    'Mercredi [15-01-2025]',
  ];

  timeSlots: string[] = [
    '08h30 à 10h00',
    '10h45 à 12h15',
    '13h00 à 14h30',
    '15h15 à 16h45',
  ];

  availability: { [day: string]: { [slot: string]: boolean } } = {};
  ensignat: string = 'USER123'; // Replace with dynamic user later if needed

  constructor(private http: HttpClient) {
    this.initializeAvailability();
  }

  initializeAvailability(): void {
    this.days.forEach((day) => {
      this.availability[day] = {};
      this.timeSlots.forEach((slot) => {
        this.availability[day][slot] = true; // Default to available
      });
    });
  }

  toggleAvailability(day: string, slot: string): void {
    this.availability[day][slot] = !this.availability[day][slot];
  }

  submitAvailability(): void {
    this.loading = true;

    const unavailableSlots: { day: string; timeSlot: string }[] = [];

    this.days.forEach((day) => {
      this.timeSlots.forEach((slot) => {
        if (!this.availability[day][slot]) {
          unavailableSlots.push({ day, timeSlot: slot });
        }
      });
    });

    if (unavailableSlots.length === 0) {
      alert('Please select at least one unavailable time slot.');
      this.loading = false;
      return;
    }

    const requests = unavailableSlots.map((slot) =>
      this.http
        .post('http://localhost:8080/api/disponibility', {
          ensignat: this.ensignat,
          day: slot.day,
          timeSlot: slot.timeSlot,
        })
        .toPromise()
    );

    Promise.all(requests)
      .then((responses) => {
        console.log('All unavailable slots saved successfully:', responses);
        alert('Availability submitted successfully!');
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error saving availability:', error);
        alert('Failed to submit some availability slots. Please try again.');
        this.loading = false;
      });
  }
}
