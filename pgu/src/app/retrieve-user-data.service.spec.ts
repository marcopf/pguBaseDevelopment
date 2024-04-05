import { TestBed } from '@angular/core/testing';

import { RetrieveUserDataService } from './gestione-utenze/retrieve-user-data.service';

describe('RetrieveUserDataService', () => {
  let service: RetrieveUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
