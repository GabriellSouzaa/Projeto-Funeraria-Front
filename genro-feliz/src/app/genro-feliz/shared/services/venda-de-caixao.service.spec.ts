import { TestBed } from '@angular/core/testing';

import { VendaDeCaixaoService } from './venda-de-caixao.service';

describe('VendaDeCaixaoService', () => {
  let service: VendaDeCaixaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendaDeCaixaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
