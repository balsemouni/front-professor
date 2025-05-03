import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true, // Add this line
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent {
  courses = [
    { code: '7301', name: "Théorie des Files d'attente", files: 3 },
    { code: '7308', name: 'Administration des réseaux', files: 9 },
    { code: '7309', name: 'Sécurité des réseaux', files: 19 },
    { code: '7302', name: 'Analyse Numérique', files: 13 },
    { code: '7303', name: 'IHM', files: 8 },
    {
      code: '7406',
      name: "Développement de portail et d'outils de travail collaboratifs",
      files: 2,
    },
  ];
}
