import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieRequestComponent } from './cookie-request.component';

describe('CookieRequestComponent', () => {
  let component: CookieRequestComponent;
  let fixture: ComponentFixture<CookieRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookieRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
