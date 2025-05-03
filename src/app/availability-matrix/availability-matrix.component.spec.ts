import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailabilityMatrixComponent } from './availability-matrix.component';
import { FormsModule } from '@angular/forms';

describe('AvailabilityMatrixComponent', () => {
  let component: AvailabilityMatrixComponent;
  let fixture: ComponentFixture<AvailabilityMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AvailabilityMatrixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailabilityMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize availability matrix', () => {
    expect(component.days.length).toBe(7);
    expect(component.timeSlots.length).toBe(4);
    expect(component.availability['Monday']['08h30 - 10h00']).toBeTrue();
  });

  it('should submit availability', () => {
    spyOn(console, 'log');
    spyOn(window, 'alert');

    component.submitAvailability();

    expect(console.log).toHaveBeenCalledWith(
      'Submitted availability:',
      component.availability
    );
    expect(window.alert).toHaveBeenCalledWith(
      'Availability submitted! Check console for data.'
    );
  });

  it('should render all days and time slots', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('th').length).toBe(8); // 1 for time slot + 7 days
    expect(compiled.querySelectorAll('tr').length).toBe(5); // 1 header + 4 time slots
  });
});
