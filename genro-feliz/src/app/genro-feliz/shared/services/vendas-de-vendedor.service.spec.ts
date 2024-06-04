import { TestBed } from '@angular/core/testing';

import { VendasDeVendedorService } from './vendas-de-vendedor.service';

describe('VendasDeVendedorService', () => {
  let service: VendasDeVendedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendasDeVendedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
