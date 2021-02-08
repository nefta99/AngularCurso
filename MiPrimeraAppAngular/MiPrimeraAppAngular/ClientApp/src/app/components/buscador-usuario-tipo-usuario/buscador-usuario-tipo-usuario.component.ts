import { Component, OnInit } from '@angular/core';
import {  UsuarioService } from  '../../services/usuario.service';
@Component({
  selector: 'buscador-usuario-tipo-usuario',
  templateUrl: './buscador-usuario-tipo-usuario.component.html',
  styleUrls: ['./buscador-usuario-tipo-usuario.component.css']
})
export class BuscadorUsuarioTipoUsuarioComponent implements OnInit {

  tipoUsuarios: any;
  constructor(private usuarioServices: UsuarioService) { }

  ngOnInit() {
    //llamamos al servicio
    this.usuarioServices.getTipoUsuario().subscribe(res => this.tipoUsuarios = res);
  }

}
