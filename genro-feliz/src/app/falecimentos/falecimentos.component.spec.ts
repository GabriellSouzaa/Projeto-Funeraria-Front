import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalecimentosComponent } from './falecimentos.component';

describe('FalecimentosComponent', () => {
  let component: FalecimentosComponent;
  let fixture: ComponentFixture<FalecimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FalecimentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FalecimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
