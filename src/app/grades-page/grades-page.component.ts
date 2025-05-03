import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
@Component({
  imports: [FormsModule, FormsModule, CommonModule],
  standalone: true,

  selector: 'app-grades',
  templateUrl: './grades-page.component.html',
  styleUrls: ['./grades-page.component.css'],
})
export class GradesComponent {
  searchText: string = '';
  selectedCourse: string = '';
  progress: number = 75; // Example progress value

  // Example data
  grades = [
    {
      course: 'Mathematics',
      assignment: 'Algebra Basics',
      grade: 'A',
      percentage: 95,
      feedback: 'Great job!',
    },
    {
      course: 'Science',
      assignment: 'Chemistry Lab',
      grade: 'B',
      percentage: 85,
      feedback: 'Good effort',
    },
    {
      course: 'History',
      assignment: 'World War II',
      grade: 'C',
      percentage: 70,
      feedback: 'Needs improvement',
    },
  ];

  // Get unique courses for the dropdown
  get courses(): string[] {
    return [...new Set(this.grades.map((grade) => grade.course))];
  }

  // Filtered grades based on search and selected course
  get filteredGrades() {
    return this.grades.filter(
      (grade) =>
        (grade.course.toLowerCase().includes(this.searchText.toLowerCase()) ||
          grade.assignment
            .toLowerCase()
            .includes(this.searchText.toLowerCase())) &&
        (this.selectedCourse ? grade.course === this.selectedCourse : true)
    );
  }

  // Clear filters
  clearFilters() {
    this.searchText = '';
    this.selectedCourse = '';
  }
}
