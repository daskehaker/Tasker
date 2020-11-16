import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';

import { TosterNotificationsService } from './toster-notifications.service';

describe('TosterNotificationsService', () => {
  let service: TosterNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ToastrService, useClass: MockToastrService}
      ]
    });
    service = TestBed.inject(TosterNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

class MockToastrService {

}