import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosDeSaudeComponent } from './planos-de-saude.component';

describe('PlanosDeSaudeComponent', () => {
  let component: PlanosDeSaudeComponent;
  let fixture: ComponentFixture<PlanosDeSaudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanosDeSaudeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanosDeSaudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
