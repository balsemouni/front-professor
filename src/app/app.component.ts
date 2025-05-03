import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { TestComponent } from './test/test.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CourseListComponent } from './course-list/course-list.component';
import { CommonModule } from '@angular/common';
import { GradesComponent } from './grades-page/grades-page.component';
import { AvailabilityMatrixComponent } from './availability-matrix/availability-matrix.component';
import { ExcelUploaderComponent } from './excel-uploader/excel-uploader.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DisponibilitiesAdminComponent } from './disponibilities-admin-component/disponibilities-admin-component.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DisponibilitiesAdminComponent,
    CommonModule,
    RouterOutlet,
    NgApexchartsModule,
    StudentComponent,
    CourseListComponent,
    GradesComponent,
    AvailabilityMatrixComponent,
    FileUploadComponent,
    ExcelUploaderComponent, // ✅ now works because it's standalone
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-angular-app';
}
