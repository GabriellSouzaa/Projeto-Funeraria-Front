import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaoComponent } from './caixao.component';

describe('CaixaoComponent', () => {
  let component: CaixaoComponent;
  let fixture: ComponentFixture<CaixaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaixaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
