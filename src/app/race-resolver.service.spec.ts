import { TestBed } from '@angular/core/testing';

import { RaceResolverService } from './race-resolver.service';

describe('RaceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceResolverService = TestBed.get(RaceResolverService);
    expect(service).toBeTruthy();
  });
});
