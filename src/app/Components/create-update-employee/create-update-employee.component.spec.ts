import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateComponent } from './create-update-employee.component';

describe('CreateUpdateEmployeeComponent', () => {
  let component: CreateUpdateComponent;
  let fixture: ComponentFixture<CreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
