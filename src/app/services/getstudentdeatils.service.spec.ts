import { TestBed } from '@angular/core/testing';

import { GetstudentdeatilsService } from './getstudentdeatils.service';

describe('GetstudentdeatilsService', () => {
  let service: GetstudentdeatilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetstudentdeatilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
