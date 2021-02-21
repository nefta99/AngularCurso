import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
//Llamamos el servicio
import { ProductoServices } from '../../services/Producto.Services';
import { CategoriaService } from '../../services/categoria.service';
@Component({
  selector: 'app-producto-form-mantenimiento',
  templateUrl: './producto-form-mantenimiento.component.html',
  styleUrls: ['./producto-form-mantenimiento.component.css']
})
export class ProductoFormMantenimientoComponent implements OnInit {

  producto: FormGroup;
  categorias: any;
  marcas: any;
  constructor(private productoServices: ProductoServices, private categoriaServices: CategoriaService) {
    this.producto = new FormGroup({
      'idproducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", Validators.required),
      'stock': new FormControl("0", Validators.required),
      'idmarca': new FormControl("", Validators.required),
      'idcategoria': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.productoServices.listarMarcas().subscribe(res => this.marcas = res);
    this.categoriaServices.getCategoria().subscribe(res => this.categorias = res);
  }

}
