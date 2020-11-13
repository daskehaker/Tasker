import { TestBed } from '@angular/core/testing';

import { TosterNotificationsService } from './toster-notifications.service';

describe('TosterNotificationsService', () => {
  let service: TosterNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosterNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
