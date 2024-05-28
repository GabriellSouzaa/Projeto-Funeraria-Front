import { TestBed } from '@angular/core/testing';

import { SalasDeVelorioService } from './salas-de-velorio.service';

describe('SalasDeVelorioService', () => {
  let service: SalasDeVelorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalasDeVelorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
