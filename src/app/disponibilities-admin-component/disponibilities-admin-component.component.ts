import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import {
  DisponibilityService,
  Disponibility,
} from '../services/disponibility.service';

@Component({
  selector: 'app-disponibilities-admin-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './disponibilities-admin-component.component.html',
  styleUrls: ['./disponibilities-admin-component.component.css'],
})
export class DisponibilitiesAdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'availability', 'hours'];
  allData: Disponibility[] = [];
  filteredData: Disponibility[] = [];

  teamMembers: any[] = [];
  selectedMember: any[] = ['all'];
  startDate: Date;
  endDate: Date;
  isLoading = false;

  constructor(
    private snackBar: MatSnackBar,
    private disponibilityService: DisponibilityService
  ) {
    const today = new Date();
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }

  ngOnInit(): void {
    this.fetchDisponibilities();
  }

  fetchDisponibilities(): void {
    this.isLoading = true;
    this.disponibilityService.getAllDisponibilities().subscribe({
      next: (data) => {
        this.allData = data.map((d) => ({ ...d }));

        this.teamMembers = Array.from(
          new Map(
            this.allData.map((d) => [
              d.id,
              {
                id: d.id,
                ensignat: d.ensignat,
                timeSlot: d.timeSlot,
                day: d.day,
              },
            ])
          ).values()
        );

        this.applyFilters(); // Apply default filters after data load
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load disponibilities', 'Close', {
          duration: 3000,
        });
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.filteredData = [...this.allData]; // No conditions, assign all data
      this.isLoading = false;
    }, 500);
  }

  resetFilters(): void {
    this.selectedMember = ['all'];
    const today = new Date();
    this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.applyFilters();
  }

  exportToExcel(): void {
    if (!this.filteredData.length) {
      this.snackBar.open('No data to export', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    const excelData = this.filteredData.map((item) => ({
      timeSlot: item.timeSlot,
      ensignat: item.ensignat.toUpperCase(),
      day: item.day,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: { Disponibilities: worksheet },
      SheetNames: ['Disponibilities'],
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, 'team_disponibilities');
    this.isLoading = false;

    this.snackBar.open('Excel file downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, `${fileName}_${new Date().getTime()}.xlsx`);
  }
}
