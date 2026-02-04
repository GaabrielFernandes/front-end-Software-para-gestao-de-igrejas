import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaCadastrarComponent } from './secretaria-cadastrar.component';

describe('SecretariaCadastrarComponent', () => {
  let component: SecretariaCadastrarComponent;
  let fixture: ComponentFixture<SecretariaCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretariaCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecretariaCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
