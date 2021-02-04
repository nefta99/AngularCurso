import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProductoCategoriasComponent } from './buscador-producto-categorias.component';

describe('BuscadorProductoCategoriasComponent', () => {
  let component: BuscadorProductoCategoriasComponent;
  let fixture: ComponentFixture<BuscadorProductoCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorProductoCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorProductoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
