import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicarFalecimentoComponent } from './comunicar-falecimento.component';

describe('ComunicarFalecimentoComponent', () => {
  let component: ComunicarFalecimentoComponent;
  let fixture: ComponentFixture<ComunicarFalecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicarFalecimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComunicarFalecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
