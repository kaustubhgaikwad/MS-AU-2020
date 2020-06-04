import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeightageComponent } from './update-weightage.component';

describe('UpdateWeightageComponent', () => {
  let component: UpdateWeightageComponent;
  let fixture: ComponentFixture<UpdateWeightageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWeightageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWeightageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
