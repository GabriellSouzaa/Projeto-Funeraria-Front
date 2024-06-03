import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaDeCaixaoComponent } from './venda-de-caixao.component';

describe('VendaDeCaixaoComponent', () => {
  let component: VendaDeCaixaoComponent;
  let fixture: ComponentFixture<VendaDeCaixaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaDeCaixaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendaDeCaixaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
