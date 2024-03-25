import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneUtenzeComponent } from './gestione-utenze.component';

describe('GestioneUtenzeComponent', () => {
  let component: GestioneUtenzeComponent;
  let fixture: ComponentFixture<GestioneUtenzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioneUtenzeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneUtenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
