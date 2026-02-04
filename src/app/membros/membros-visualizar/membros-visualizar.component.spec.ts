import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosVisualizarComponent } from './membros-visualizar.component';

describe('MembrosVisualizarComponent', () => {
  let component: MembrosVisualizarComponent;
  let fixture: ComponentFixture<MembrosVisualizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembrosVisualizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembrosVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
