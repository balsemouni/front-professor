import { Component } from '@angular/core';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [FileSizePipe, NgIf, MatIconModule],
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  isDragging = false;
  Dragged = false; // New variable to track the dragging state
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.Dragged = false; // Reset the dragging state when the drag leaves the area
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    this.Dragged = false; // Reset the dragging state when a file is dropped
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.Dragged = true; // Set the dragging state to true when a file is dragged over the area
  }
}
