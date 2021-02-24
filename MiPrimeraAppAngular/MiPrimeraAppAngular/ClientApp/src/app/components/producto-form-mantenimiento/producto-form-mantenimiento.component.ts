import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  titulo: string;
  parametro: string;

  constructor(private productoServices: ProductoServices, private categoriaServices: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.producto = new FormGroup({
      'idproducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", Validators.required),
      'stock': new FormControl("0", [Validators.required, this.noPuntoDecimal]),
      'idmarca': new FormControl("", Validators.required),
      'idcategoria': new FormControl("", Validators.required)
    });
    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando un nuevo producto";
      }
      else {
        this.titulo = "Editando un producto";
      }
    })
  }

  ngOnInit() {
    this.productoServices.listarMarcas().subscribe(res => this.marcas = res);
    this.categoriaServices.getCategoria().subscribe(res => this.categorias = res);
    if (this.parametro != "nuevo") {
      this.productoServices.obtenerProductoPorId(this.parametro).subscribe(data => {
        this.producto.controls["idproducto"].setValue(data.idproducto);
        this.producto.controls["nombre"].setValue(data.nombre);
        this.producto.controls["precio"].setValue(data.precio);
        this.producto.controls["stock"].setValue(data.stock);
        this.producto.controls["idmarca"].setValue(data.idmarca);
        this.producto.controls["idcategoria"].setValue(data.idcategoria);
      });
    }
  }


  guardarDatos() {
    if (this.producto.valid == true) {
      this.productoServices.registrarProducto(this.producto.value)
        .subscribe(p => {
          this.router.navigate(["./mantenimiento-producto"]);
        });
    }

  }

  noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value != "") {    
      if ((<string>control.value.toString()).indexOf(".") > -1) {
          return { puntoDecimal: true };
      }
    }
    return null;

  }
}
