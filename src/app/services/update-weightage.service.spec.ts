import { TestBed } from '@angular/core/testing';

import { UpdateWeightageService } from './update-weightage.service';

describe('UpdateWeightageService', () => {
  let service: UpdateWeightageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateWeightageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
