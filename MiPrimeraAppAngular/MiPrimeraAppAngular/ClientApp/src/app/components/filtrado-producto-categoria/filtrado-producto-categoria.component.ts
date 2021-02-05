import { Component, OnInit } from '@angular/core';
import {ProductoServices } from '../../services/Producto.Services';
@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styleUrls: ['./filtrado-producto-categoria.component.css']
})
export class FiltradoProductoCategoriaComponent implements OnInit {


  productos: any;
  constructor(private productoService:ProductoServices) {
  }

  ngOnInit() {
  }

  buscar(categoria) {
    if (categoria.value == "") {
      this.productoService.getProducto().subscribe(rpta => this.productos = rpta)
    } else {
      this.productoService.getFiltroProductoPorCategoria(categoria.value).subscribe(rpta => this.productos = rpta);
    }
    
  }

  limpiar(categoria) {
    categoria.value = "";
    this.productoService.getProducto().subscribe(rpta => this.productos = rpta);

  }
}
