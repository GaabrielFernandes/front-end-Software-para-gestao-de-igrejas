import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourariaListarComponent } from './tesouraria-listar.component';

describe('TesourariaListarComponent', () => {
  let component: TesourariaListarComponent;
  let fixture: ComponentFixture<TesourariaListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesourariaListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesourariaListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
