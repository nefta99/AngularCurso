import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
  selector: 'tipo-usuario-form-mantenimiento',
  templateUrl: './tipo-usuario-form-mantenimiento.component.html',
  styleUrls: ['./tipo-usuario-form-mantenimiento.component.css']
})
export class TipoUsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuario: FormGroup;
  paginas: any;
  parametros: string;
  titulo: string;
  constructor(private usuarioServices: UsuarioService, private activateRoute: ActivatedRoute
    , private router: Router) {
    this.tipoUsuario = new FormGroup({
      "iidtipousuario": new FormControl(""),
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "descripcion": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "valores": new FormControl("")
    });
    this.activateRoute.params.subscribe(param => {
      this.parametros = param["id"];
      if (this.parametros == "nuevo") {
        this.titulo = "Agregar un tipo usuario";
      }
      else {
        this.titulo = "Editar un tipo usuario";
      }
    });
    this.usuarioServices.listarPaginasTipoUsuario().subscribe(data => {
      this.paginas = data;
    });
  }

  ngOnInit() {
    //recuperar informacion
    if (this.parametros != "nuevo") {
      this.usuarioServices.listarPaginasRecuperar(this.parametros).subscribe(res => {
        this.tipoUsuario.controls["iidtipousuario"].setValue(res.iidtipoUsuario);
        this.tipoUsuario.controls["nombre"].setValue(res.nombre);
        this.tipoUsuario.controls["descripcion"].setValue(res.descripcion);
        var listaPaginas = res.listaPagina.map(p => p.iidpagina);

        //pintar la informacion

        setTimeout(() => {
          var checks = document.getElementsByClassName("check");
          var ncheck = checks.length;
          var check;
          for (var i = 0; i < ncheck; i++) {
            check = checks[i];
            var indice = listaPaginas.indexOf(check.name * 1);
            if (indice > -1) {
              check.checked = true;
            }
          }
        },500)

      });
    }
  }


  guardarDatos() {
    if (this.tipoUsuario.valid == true) {
      this.usuarioServices.guardarDatosTipoUsuario(this.tipoUsuario.value).subscribe(res => {
        this.router.navigate(["/mantenimiento-tipoUsuario"])
      });
    }
  }
  verCheck() {
    var seleccionados = "";
    var checks = document.getElementsByClassName("check");
    var check;
    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked == true) {
        seleccionados += check.name;
        seleccionados +="$"
      }
    }
    if (seleccionados != "") {
      seleccionados = seleccionados.substring(0, seleccionados.length - 1);
    }
    this.tipoUsuario.controls["valores"].setValue(seleccionados);
  }
}
