import { Component, OnInit,Input } from '@angular/core';
//importamos el servicio
import { ProductoServices } from '../../services/Producto.Services';
@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  //definimos variable global
  @Input() productos: any;
  cabeceras: string[] = ["Id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];
  //                    I
  //                    v  tambien aqui definimos variables globales, en el mismo contructor
  constructor(private producto: ProductoServices) {

  }

  /*
    Este metodo es parta de la programación de angular
    Todo lo que ejecutamos en el ngOnInit se va a ejecutar cuando cargue la pagina
  */
  ngOnInit() {
    //con esta linea traemos el data del controlador y se almacena en productos
    this.producto.getProducto().subscribe(
      data => this.productos = data
    );
  }

}
