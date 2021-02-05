import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
@Component({
  selector: 'buscador-producto-categorias',
  templateUrl: './buscador-producto-categorias.component.html',
  styleUrls: ['./buscador-producto-categorias.component.css']
})
export class BuscadorProductoCategoriasComponent implements OnInit {

  categorias: any;//tenemos la lista para llenar el combox
  @Output() clickBuscar: EventEmitter<any>;
  @Output() clickLimpiar: EventEmitter<any>;

  constructor(private categoriaServicio: CategoriaService) {
    this.clickBuscar = new EventEmitter();
    this.clickLimpiar = new EventEmitter();
  }

  ngOnInit() {
    this.categoriaServicio.getCategoria().subscribe(p => this.categorias = p);
  }
  public buscar(categoria) {
    //Se conecta coon el componente papa
    this.clickBuscar.emit(categoria);
  }
  public limpiar(categoria) {
    //Se conecta coon el componente papa
    this.clickLimpiar.emit(categoria);
  }
}
