import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesComBeneficiariosFalecidosComponent } from './clientes-com-beneficiarios-falecidos.component';

describe('ClientesComBeneficiariosFalecidosComponent', () => {
  let component: ClientesComBeneficiariosFalecidosComponent;
  let fixture: ComponentFixture<ClientesComBeneficiariosFalecidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComBeneficiariosFalecidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesComBeneficiariosFalecidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
