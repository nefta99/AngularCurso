import { Component, OnInit } from '@angular/core';
import { ProductoServices } from '../../services/Producto.Services';

@Component({
  selector: 'filtrado-producto-nombre',
  templateUrl: './filtrado-producto-nombre.component.html',
  styleUrls: ['./filtrado-producto-nombre.component.css']
})
export class FiltradoProductoNombreComponent implements OnInit {

  //variables
  productos: any;

  constructor(private productoService: ProductoServices) { }

  ngOnInit() {
  }
  filtrarDatos(nombre) {
    //console.log(nombre.value);
    if (nombre.value == "")
    {
      this.productoService.getProducto().subscribe(data => this.productos = data);
    }
    else
    {
      this.productoService.getFiltroProductoPorNombre(nombre.value).subscribe(data => this.productos = data);
    }
    
  }

  limpiar(nombre) {
    nombre.value = "";
    this.productoService.getProducto().subscribe(data => this.productos = data);
  }
}
