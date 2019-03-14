import { TestBed } from '@angular/core/testing';

import { GoogleApiServiceService } from './google-api-service.service';

describe('GoogleApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleApiServiceService = TestBed.get(GoogleApiServiceService);
    expect(service).toBeTruthy();
  });
});
