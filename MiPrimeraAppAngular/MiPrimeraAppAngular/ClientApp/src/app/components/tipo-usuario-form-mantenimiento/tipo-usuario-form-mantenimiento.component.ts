import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'tipo-usuario-form-mantenimiento',
  templateUrl: './tipo-usuario-form-mantenimiento.component.html',
  styleUrls: ['./tipo-usuario-form-mantenimiento.component.css']
})
export class TipoUsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuario: FormGroup;
  paginas: any;
  constructor(private usuarioServices: UsuarioService) {
    this.tipoUsuario = new FormGroup({
      "iidtipousuario": new FormControl(""),
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "descripcion": new FormControl("", [Validators.required, Validators.maxLength(100)])
    });
  }

  ngOnInit() {
    this.usuarioServices.listarPaginasTipoUsuario().subscribe(data => {
      this.paginas = data;
    });
  }


  guardarDatos() {

  }
}
