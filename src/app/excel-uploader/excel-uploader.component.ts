import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-excel-uploader',
  standalone: true,
  imports: [],
  templateUrl: './excel-uploader.component.html',
  styleUrls: ['./excel-uploader.component.css']
})
export class ExcelUploaderComponent {
  file1: File | null = null;
  file2: File | null = null;
  outputData: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  onFileChange(event: Event, fileNumber: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    
    const file = input.files[0];
    if (!this.validateExcelFile(file)) {
      this.errorMessage = 'Please upload a valid Excel file (.xlsx, .xls)';
      return;
    }

    if (fileNumber === 1) this.file1 = file;
    if (fileNumber === 2) this.file2 = file;
    
    this.errorMessage = null;
    this.successMessage = null;
  }

  private validateExcelFile(file: File): boolean {
    const validExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    return validExtensions.includes(fileExtension);
  }

  async processFiles(): Promise<void> {
    if (!this.file1 || !this.file2) {
      this.errorMessage = 'Please upload both Excel files.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      const [data1, data2] = await Promise.all([
        this.readExcel(this.file1),
        this.readExcel(this.file2)
      ]);

      // Enhanced data merging with duplicate checking
      this.outputData = this.mergeAndDeduplicateData(data1, data2);
      this.successMessage = 'Files processed successfully!';
    } catch (error) {
      console.error('Error processing files:', error);
      this.errorMessage = 'Error processing files. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private mergeAndDeduplicateData(data1: any[], data2: any[]): any[] {
    // Simple merge - customize this based on your specific requirements
    const merged = [...data1, ...data2];
    
    // Basic deduplication (assuming each row has an 'id' field)
    // Replace with your actual unique identifier logic
    return merged.filter((item, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
    );
  }

  private readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const bstr = e.target?.result as string;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('File reading error'));
      reader.readAsBinaryString(file);
    });
  }

  downloadOutput(): void {
    if (this.outputData.length === 0) {
      this.errorMessage = 'No processed data to download.';
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(this.outputData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Output');
      
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      saveAs(blob, `processed_output_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (error) {
      console.error('Error generating output:', error);
      this.errorMessage = 'Error generating output file.';
    }
  }

  clearFiles(): void {
    this.file1 = null;
    this.file2 = null;
    this.outputData = [];
    this.errorMessage = null;
    this.successMessage = null;
    // Reset file input elements if needed
    const inputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.value = '');
  }
}