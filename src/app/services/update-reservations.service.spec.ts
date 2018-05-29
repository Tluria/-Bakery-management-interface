import { TestBed, inject } from '@angular/core/testing';

import { UpdateReservationsService } from './update-reservations.service';

describe('UpdateReservationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateReservationsService]
    });
  });

  it('should be created', inject([UpdateReservationsService], (service: UpdateReservationsService) => {
    expect(service).toBeTruthy();
  }));
});
