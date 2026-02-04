import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConselhoFiscalListarComponent } from './conselho-fiscal-listar.component';

describe('ConselhoFiscalListarComponent', () => {
  let component: ConselhoFiscalListarComponent;
  let fixture: ComponentFixture<ConselhoFiscalListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConselhoFiscalListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConselhoFiscalListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
