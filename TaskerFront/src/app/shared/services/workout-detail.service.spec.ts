import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WorkoutDetailService } from './workout-detail.service';

describe('WorkoutDetailService', () => {
  let service: WorkoutDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
    service = TestBed.inject(WorkoutDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

class MockHttpClient{}