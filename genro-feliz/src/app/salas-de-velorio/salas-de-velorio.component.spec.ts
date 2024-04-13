import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasDeVelorioComponent } from './salas-de-velorio.component';

describe('SalasDeVelorioComponent', () => {
  let component: SalasDeVelorioComponent;
  let fixture: ComponentFixture<SalasDeVelorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasDeVelorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalasDeVelorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
