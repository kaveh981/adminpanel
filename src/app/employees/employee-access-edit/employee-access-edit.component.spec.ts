import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccessEditComponent } from './employee-access-edit.component';

describe('EmployeeAccessEditComponent', () => {
  let component: EmployeeAccessEditComponent;
  let fixture: ComponentFixture<EmployeeAccessEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAccessEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAccessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
