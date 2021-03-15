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
  foto: any;

  constructor(private productoServices: ProductoServices, private categoriaServices: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.producto = new FormGroup({
      'idproducto': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'precio': new FormControl("0", Validators.required),
      'stock': new FormControl("0", [Validators.required, this.noPuntoDecimal]),
      'idmarca': new FormControl("", Validators.required),
      'idcategoria': new FormControl("", Validators.required),
      'foto':new FormControl("")
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


  changeFoto() {
    var file = (<HTMLInputElement>document.getElementById("fupFoto")).files[0];
    var fileReader = new FileReader();


    fileReader.onloadend = () => {
       this.foto = fileReader.result;
    }

    fileReader.readAsDataURL(file);
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
        if (data.foto == null) {
          this.foto = "";
        } else {
          this.foto = data.foto;
        }
      });
    }
  }


  guardarDatos() {
    if (this.producto.valid == true) {
      this.producto.controls["foto"].setValue(this.foto);
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
