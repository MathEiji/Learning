import { TestBed } from '@angular/core/testing';

import { EmailCreationService } from './email-creation.service';

describe('EmailCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailCreationService = TestBed.get(EmailCreationService);
    expect(service).toBeTruthy();
  });
});
