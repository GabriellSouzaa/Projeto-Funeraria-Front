import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanosFunerariosComponent } from './planos-funerarios.component';

describe('PlanosFunerariosComponent', () => {
  let component: PlanosFunerariosComponent;
  let fixture: ComponentFixture<PlanosFunerariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanosFunerariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanosFunerariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
