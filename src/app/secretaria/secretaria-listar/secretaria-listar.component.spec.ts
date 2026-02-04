import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaListarComponent } from './secretaria-listar.component';

describe('SecretariaListarComponent', () => {
  let component: SecretariaListarComponent;
  let fixture: ComponentFixture<SecretariaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretariaListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretariaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
