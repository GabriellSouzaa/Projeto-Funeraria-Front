import { TestBed } from '@angular/core/testing';

import { PlanoDeSaudeService } from './plano-de-saude.service';

describe('PlanoDeSaudeService', () => {
  let service: PlanoDeSaudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoDeSaudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
