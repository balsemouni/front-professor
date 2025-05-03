import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Disponibility {
  id: number;
  ensignat: string;
  day: string;
  timeSlot: string;
}

@Injectable({
  providedIn: 'root',
})
export class DisponibilityService {
  private baseUrl = 'http://localhost:8080/api/disponibility'; // Replace with actual API
  loading = false;

  constructor(private http: HttpClient) {}

  getAllDisponibilities(): Observable<Disponibility[]> {
    this.loading = true;

    return new Observable<Disponibility[]>((observer) => {
      this.http.get<Disponibility[]>(this.baseUrl).subscribe({
        next: (response) => {
          console.log('Successfully fetched availability:', response);
          observer.next(response); // Emit the response to the subscriber
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching availability:', error);
          alert('Failed to fetch availability. Please try again.');
          observer.error(error); // Handle the error by notifying the subscriber
          this.loading = false;
        },
      });
    });
  }
}
