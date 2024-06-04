import { TestBed } from '@angular/core/testing';

import { SalasDeVelorioMaisUsadasService } from './salas-de-velorio-mais-usadas.service';

describe('SalasDeVelorioMaisUsadasService', () => {
  let service: SalasDeVelorioMaisUsadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalasDeVelorioMaisUsadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
