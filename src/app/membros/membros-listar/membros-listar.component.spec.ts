import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembrosListarComponent } from './membros-listar.component';

describe('MembrosListarComponent', () => {
  let component: MembrosListarComponent;
  let fixture: ComponentFixture<MembrosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembrosListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembrosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
