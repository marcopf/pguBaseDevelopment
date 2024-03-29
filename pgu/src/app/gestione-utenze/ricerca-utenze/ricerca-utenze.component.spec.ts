import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaUtenzeComponent } from './ricerca-utenze.component';

describe('RicercaUtenzeComponent', () => {
  let component: RicercaUtenzeComponent;
  let fixture: ComponentFixture<RicercaUtenzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicercaUtenzeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RicercaUtenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
