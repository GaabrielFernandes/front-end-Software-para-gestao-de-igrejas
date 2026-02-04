import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgpdFieldComponent } from './lgpd-field.component';

describe('LgpdFieldComponent', () => {
  let component: LgpdFieldComponent;
  let fixture: ComponentFixture<LgpdFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LgpdFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgpdFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
