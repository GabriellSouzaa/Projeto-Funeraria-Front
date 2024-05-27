import { TestBed } from '@angular/core/testing';

import { CaixaoService } from './caixao.service';

describe('CaixaoService', () => {
  let service: CaixaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaixaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
