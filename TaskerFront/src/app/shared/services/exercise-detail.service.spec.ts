import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ExerciseDetailService } from './exercise-detail.service';

describe('ExerciseDetailService', () => {
  let service: ExerciseDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
    service = TestBed.inject(ExerciseDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

class MockHttpClient {

}