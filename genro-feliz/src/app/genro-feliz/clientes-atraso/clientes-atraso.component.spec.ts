import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesAtrasoComponent } from './clientes-atraso.component';

describe('ClientesAtrasoComponent', () => {
  let component: ClientesAtrasoComponent;
  let fixture: ComponentFixture<ClientesAtrasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesAtrasoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientesAtrasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
