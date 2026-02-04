import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourariaCadatrarComponent } from './tesouraria-cadastrar.component';

describe('TesourariaCadatrarComponent', () => {
  let component: TesourariaCadatrarComponent;
  let fixture: ComponentFixture<TesourariaCadatrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesourariaCadatrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesourariaCadatrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
