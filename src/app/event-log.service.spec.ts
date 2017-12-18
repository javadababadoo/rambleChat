import { TestBed, inject } from '@angular/core/testing';

import { EventLogService } from './event-log.service';

describe('EventLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventLogService]
    });
  });

  it('should be created', inject([EventLogService], (service: EventLogService) => {
    expect(service).toBeTruthy();
  }));
});
