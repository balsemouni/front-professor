import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-main',
  standalone: true,
  imports: [    MatIconModule, // Import MatIconModule
    CommonModule,
  ],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  selectedMenu: string = ''; // default menu view
  sidebarItems = [
    { name: 'Books', icon: 'book' },
    { name: 'Courses', icon: 'school' },
    { name: 'Grades', icon: 'grade' },
    { name: 'Disponibility', icon: 'event_available' },
  ];

  notifications = [
    { message: 'New course added', time: '2 hours ago' },
    { message: 'Grade updated', time: '1 day ago' },
  ];

  barChartOptions = {
    // Add your chart options here
  };

  radialChartOptions = {
    series: [
      { data: [20, 40, 60] },
    ],
    chart: { type: 'radialBar' },
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
        dataLabels: { name: { show: true }, value: { show: true } },
      },
    },
    labels: ['A', 'B', 'C'],
    stroke: { lineCap: 'round' },
    fill: { colors: ['#ff0000', '#00ff00', '#0000ff'] },
  };

  resetToDefaultView() {
    this.selectedMenu = '';
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  logout() {
    console.log('Logout');
  }
}
