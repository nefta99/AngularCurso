import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
@Component({
  selector: 'buscador-producto-categorias',
  templateUrl: './buscador-producto-categorias.component.html',
  styleUrls: ['./buscador-producto-categorias.component.css']
})
export class BuscadorProductoCategoriasComponent implements OnInit {

  categorias: any;//tenemos la lista para llenar el combox


  constructor(private categoriaServicio: CategoriaService) {
  }

  ngOnInit() {
    this.categoriaServicio.getCategoria().subscribe(p => this.categorias = p);
  }

}
