import { TestBed, async, inject } from '@angular/core/testing';

import { DirectorGuard } from './director.guard';

describe('DirectorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectorGuard]
    });
  });

  it('should ...', inject([DirectorGuard], (guard: DirectorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
