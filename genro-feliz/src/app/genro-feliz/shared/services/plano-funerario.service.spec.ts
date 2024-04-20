import { TestBed } from '@angular/core/testing';

import { PlanoFunerarioService } from './plano-funerario.service';

describe('PlanoFunerarioService', () => {
  let service: PlanoFunerarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoFunerarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
