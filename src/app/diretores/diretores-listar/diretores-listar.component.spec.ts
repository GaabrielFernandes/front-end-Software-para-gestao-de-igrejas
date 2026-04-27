import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretoresListarComponent } from './diretores-listar.component';

describe('DiretoresListarComponent', () => {
  let component: DiretoresListarComponent;
  let fixture: ComponentFixture<DiretoresListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiretoresListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiretoresListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
