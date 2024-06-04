import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorteDePacienteComponent } from './morte-de-paciente.component';

describe('MorteDePacienteComponent', () => {
  let component: MorteDePacienteComponent;
  let fixture: ComponentFixture<MorteDePacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MorteDePacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MorteDePacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
