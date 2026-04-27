import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoresCadastrarComponent } from './diretores-cadastrar.component';

describe('DiretoresCadastrarComponent', () => {
  let component: DiretoresCadastrarComponent;
  let fixture: ComponentFixture<DiretoresCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiretoresCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiretoresCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
