import { TestBed, async, inject } from '@angular/core/testing';

import { SpecialGuard } from './special.guard';

describe('SpecialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialGuard]
    });
  });

  it('should ...', inject([SpecialGuard], (guard: SpecialGuard) => {
    expect(guard).toBeTruthy();
  }));
});
