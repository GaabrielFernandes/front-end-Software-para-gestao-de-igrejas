import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConselhoFiscalCadastrarComponent } from './conselho-fiscal-cadastrar.component';

describe('ConselhoFiscalCadastrarComponent', () => {
  let component: ConselhoFiscalCadastrarComponent;
  let fixture: ComponentFixture<ConselhoFiscalCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConselhoFiscalCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConselhoFiscalCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
