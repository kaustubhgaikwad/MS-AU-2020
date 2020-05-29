import { TestBed } from '@angular/core/testing';

import { StudentAuthGuard } from './student-auth-guard.service';

describe('StudentAuthGuardService', () => {
  let service: StudentAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
