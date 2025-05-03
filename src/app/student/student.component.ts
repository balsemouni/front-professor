import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { register } from 'swiper/element/bundle';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { GradesComponent } from '../grades-page/grades-page.component';
import { AvailabilityMatrixComponent } from '../availability-matrix/availability-matrix.component';

// register Swiper custom elements
register();
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ApexStroke,
} from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
// import { GradesPageComponent } from '../grades-page/grades-page.component';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    AvailabilityMatrixComponent,
    GradesComponent,
    CommonModule,
    CanvasJSAngularChartsModule,
    NgApexchartsModule,
    FormsModule,
    MatIconModule,
    FullCalendarModule,
    CarouselComponent,
    MatIconModule,
    CourseListComponent,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentComponent {
  selectedMenu: string = '';
  sidebarItems = [
    { name: 'Courses', icon: 'books' },
    { name: 'Schedule', icon: 'calendar_today' },
    { name: 'disponibility', icon: 'calendar_today' },
  ];

  courses = [
    { name: 'Mathematics 1', code: 'MATH101', progress: 75 },
    { name: 'Mathematics 2', code: 'MATH102', progress: 60 },
    { name: 'Physics 1', code: 'PHYS101', progress: 80 },
    { name: 'Physics 2', code: 'PHYS102', progress: 50 },
    { name: 'Science', code: 'SCI101', progress: 90 },
  ];

  notifications = [
    { message: 'New note uploaded for Mathematics', time: '2 hours ago' },
    { message: 'Deadline for Physics assignment', time: '1 day ago' },
  ];

  public radialChartOptions: ChartOptions = {
    series: [75],
    chart: {
      height: 250, // Adjust height if necessary
      type: 'radialBar',
      toolbar: { show: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          dropShadow: { enabled: true, top: 3, blur: 4, opacity: 0.24 },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0,
          dropShadow: { enabled: true, top: -3, blur: 4, opacity: 0.35 },
        },
        dataLabels: {
          show: true,
          name: { offsetY: -10, color: '#888', fontSize: '17px' },
          value: {
            formatter: (val: number) => `${Math.round(val)}%`,
            color: '#111',
            fontSize: '28px',
          },
        },
      },
    },
    fill: {
      type: 'solid', // Using solid color instead of gradient
      colors: ['#2E506C'], // Light blue color as an array
    },
    stroke: { lineCap: 'round' },
    labels: ['Percent'],
  };

  public barChartOptions = {
    animationEnabled: true,
    title: { text: 'Hours Spent' },
    axisY: { title: 'Hours' },
    axisX: { title: 'Months' },
    width: 300, // Set a smaller width for the chart
    height: 250,
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: 'Jan', y: 40 },
          { label: 'Feb', y: 20 },
          { label: 'Mar', y: 60 },
          { label: 'Apr', y: 40 },
          { label: 'May', y: 20 },
        ],
        // color: '#888', // Set a default color (can be any, we will override with gradient)
        // Apply gradient fill
        color: '#2E506C',
      },
    ],
  };

  resetToDefaultView() {
    this.selectedMenu = '';
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  logout() {
    console.log('User logged out');
  }

  viewCourseDetails(course: any) {
    console.log('Viewing details for:', course.name);
  }
}
