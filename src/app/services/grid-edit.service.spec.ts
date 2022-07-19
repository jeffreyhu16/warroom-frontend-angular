import { TestBed } from '@angular/core/testing';

import { GridEditService } from './grid-edit.service';

describe('GridEditService', () => {
  let service: GridEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
