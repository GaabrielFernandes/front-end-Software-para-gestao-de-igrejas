import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosCadastrarComponent } from './membros-cadastrar.component';

describe('MembrosCadastrarComponent', () => {
  let component: MembrosCadastrarComponent;
  let fixture: ComponentFixture<MembrosCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembrosCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembrosCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
