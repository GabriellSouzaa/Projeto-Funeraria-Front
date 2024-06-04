import { TestBed } from '@angular/core/testing';

import { MorteDePacienteService } from './morte-de-paciente.service';

describe('MorteDePacienteService', () => {
  let service: MorteDePacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MorteDePacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
