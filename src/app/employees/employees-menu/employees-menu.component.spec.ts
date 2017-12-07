import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesMenuComponent } from './employees-menu.component';

describe('EmployeesMenuComponent', () => {
  let component: EmployeesMenuComponent;
  let fixture: ComponentFixture<EmployeesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
