import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilitiesAdminComponent } from './disponibilities-admin-component.component';

describe('DisponibilitiesAdminComponentComponent', () => {
  let component: DisponibilitiesAdminComponent;
  let fixture: ComponentFixture<DisponibilitiesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibilitiesAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisponibilitiesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
