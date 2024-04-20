import { TestBed } from '@angular/core/testing';

import { PlanoFunerarioEmAtrasoService } from './plano-funerario-em-atraso.service';

describe('PlanoFunerarioEmAtrasoService', () => {
  let service: PlanoFunerarioEmAtrasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoFunerarioEmAtrasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
