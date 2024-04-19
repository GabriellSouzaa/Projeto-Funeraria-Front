import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataHoraAtualComponent } from './data-hora-atual.component';

describe('DataHoraAtualComponent', () => {
  let component: DataHoraAtualComponent;
  let fixture: ComponentFixture<DataHoraAtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataHoraAtualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataHoraAtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
